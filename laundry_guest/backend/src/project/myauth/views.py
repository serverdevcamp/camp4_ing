from django.core.cache import cache
from django.contrib.auth import get_user_model
from django.contrib.auth.hashers import check_password
from django.shortcuts import render
from rest_framework import permissions
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .serializers import ProfileSerializer
from .models import Profile
# jwt
import jwt
from datetime import datetime
from django.conf import settings
# mail 인증
from uuid import uuid4
from django.contrib.sites.shortcuts import get_current_site
from django.template.loader import render_to_string
from django.core.mail import EmailMessage


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
            profile = serializer.save()
        else:
            return Response({
                'response': 'error',
                'message': serializer.errors
            })

        uuid = uuid4()
        cache.set(uuid, profile.user.id)
        current_site = get_current_site(request)
        message = render_to_string(
            'myauth/user_activate_email.html',
            {
                'domain': current_site.domain,
                'uuid': uuid
            }
        )
        mail_subject = "[LaundryRunner] 회원가입 인증 메일입니다."
        user_email = profile.user.email
        email = EmailMessage(mail_subject, message, to=[user_email])
        email_result = email.send()
        print(email_result, "@@@@@@@@@@@@@@@@@@@@@@")

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


@api_view(['GET', ])
def profile_activate(request, uuid):
    user_id = cache.get(uuid)
    User = get_user_model()
    user = User.objects.get(id=user_id)

    if user is not None:
        user.is_active = True
        user.save()
    else:
        return Response({
            'response': 'error',
            'message': 'user in None',
        })

    return Response({
        'response': 'success',
        'message': 'The user is activated.'
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
