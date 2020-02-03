from django.core.cache import cache
from django.http import Http404, JsonResponse
from django.conf import settings
from rest_framework.response import Response
import jwt
import re
from .models import Profile


class MyTokenAuthenticationMiddleware(object):
    def __init__(self, get_response):
        self.get_response = get_response
        self.API_URLS = [
            re.compile(r'laundry/(.*)'),
        ]

    def __call__(self, request):

        path = request.path_info.lstrip('/')
        valid_urls = (url.match(path) for url in self.API_URLS)
        if not any(valid_urls):
            response = self.get_response(request)
            return response
        key = request.COOKIES['jwt']
        session_jwt = request.session.get(key)
        redis_jwt = cache.get(key)
        if session_jwt == redis_jwt:
            payload = jwt.decode(session_jwt, settings.SECRET_KEY, 'HS256')
            username = payload['username']
            profile = Profile.objects.get(username=username)
            request.user = profile
            response = self.get_response(request)
            return response
        else:
            response = JsonResponse({
                'response': 'error',
                'message': '로그인이 필요합니다.'
            }, status=200)
            return response
        response = self.get_response(request)
        return response
