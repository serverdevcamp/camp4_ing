from django.core.cache import cache
from django.contrib.auth import get_user_model
from django.contrib.auth.hashers import check_password
from django.shortcuts import render
from rest_framework import permissions
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import ProfileSerializer
from .models import Profile
# jwt
import jwt
from datetime import datetime
from django.conf import settings


class CreateProfileView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request, *args, **kwargs):
        data = request.data.get('profile')
        if not data:
            return Response({
                'response': 'error',
                'message': 'No data found'
            })
        serializer = ProfileSerializer(data=data)
        if serializer.is_valid():
            saved_profile = serializer.save()
        else:
            return Response({
                'response': 'error',
                'message': serializer.errors
            })
        return Response({
            'response': 'success',
            'message': 'user create sucessfully'
        })


class UserLoginView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request, *args, **kargs):
        data = request.data.get('profile')
        if not data:
            return Response({
                'response': 'error',
                'message': 'No data found'
            })

        username = data['username']
        password = data['password']
        User = get_user_model()
        user = User.objects.get(username=username)

        if check_password(password, user.password):
            token = jwt_create(username)
            cache.set('jwttoken', token)
            response = Response({
                'response': 'success',
                'message': 'success login',
            })
            response.set_cookie('jwttoken', token)
            return response
        else:
            return Response({
                'response': 'error',
                'message': 'password is wrong',
            })


def main(request):
    return render(request, 'myauth/main.html')


def jwt_create(username):
    now = datetime.now()
    key = settings.SECRET_KEY
    now_time = str(now.year)+str(now.month)+str(now.day) + \
        str(now.hour)+str(now.minute)+str(now.second)

    payload = {
        "username": username,
        "now_time": now_time
    }

    token = jwt.encode(payload, key, algorithm='HS256').decode('utf-8')
    return token
