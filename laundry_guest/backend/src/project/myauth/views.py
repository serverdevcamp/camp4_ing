from django.core.cache import cache
from django.contrib.auth import get_user_model, authenticate
from django.contrib.auth.hashers import check_password
from django.shortcuts import render, redirect
from django.http import Http404
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
                'message': 'profile 파라미터가 없습니다.'
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
        cache.set(uuid, profile.id)
        current_site = get_current_site(request)
        message = render_to_string(
            'myauth/user_activate_email.html',
            {
                'domain': current_site.domain,
                'uuid': uuid
            }
        )
        mail_subject = "[LaundryRunner] 회원가입 인증 메일입니다."
        user_email = profile.email
        email = EmailMessage(mail_subject, message, to=[user_email])
        email_result = email.send()

        return Response({
            'response': 'success',
            'message': 'profile 이 성공적으로 생성되었습니다.'
        })

    def get(self, request, *args, **kwargs):
        queryset = get_user_model().objects.all()
        serializer = ProfileSerializer(queryset, many=True)
        return Response(serializer.data)


class UserLoginView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request, *args, **kargs):
        data = request.data.get('profile')
        if not data:
            return Response({
                'response': 'error',
                'message': 'profile 파라미터가 없습니다.'
            })

        username = data['username']
        password = data['password']

        User = get_user_model()
        try:
            user = User.objects.get(username=username)
        except:
            return Response({
                'response': 'error',
                'message': 'username 파라미터가 없습니다.',
            })

        if user.status == '0':
            return Response({
                'response': 'error',
                'message': '해당 계정은 권한이 없습니다.(이메일 인증 필요)'
            })
        elif check_password(password, user.password):
            token = jwt_create(username)
            key = token.split('.')[2]
            cache.set(key, token)
            response = Response({
                'response': 'success',
                'message': '로그인 요청이 성공하였습니다.',
            })
            request.session[key] = token
            # print(request.COOKIES['sessionid'])
            response.set_cookie('jwt', key)
            return response
        else:
            return Response({
                'response': 'error',
                'message': '비밀번호가 잘못되었습니다.',
            })


@api_view(['GET', ])
def logout(request):
    key = request.COOKIES.get('jwt')
    cache.delete(key)
    try:
        del request.session[key]
    except:
        return Response({
            'response': 'error',
            'message': '로그인 되어있지 않습니다.'
        })
    return Response({
        'response': 'success',
        'message': '로그아웃 요청이 성공하였습니다.'
    })


class ProfileDetailView(APIView):
    def get_object(self, request, id):
        try:
            return Profile.objects.get(id=id)
        except:
            return Response({
                'response': 'error',
                'message': 'profile/{} 페이지를 찾을 수 없습니다.'.format(id)
            })

    def get(self, request, id):
        profile = self.get_object(request, id)
        serializer = ProfileSerializer(profile)
        return Response({
            'response': 'success',
            'message': 'profile 조회 요청이 성공하였습니다.',
            'data': serializer.data
        })

    def put(self, request, id):
        profile = self.get_object(request, id)
        serializer = ProfileSerializer(
            profile, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response({
                'response': 'success',
                'message': 'profile이 성공적으로 수정되었습니다.',
                'data': serializer.data
            })
        else:
            return Response({
                'response': 'error',
                'message': serializer.errors
            })

    def delete(self, request, id):
        profile = self.get_object(request, id)
        profile.status = '9'
        return Response({
            'response': 'success',
            'message': 'profile이 성공적으로 삭제되었습니다.'
        })


@api_view(['GET', ])
def profile_activate(request, uuid):
    user_id = cache.get(uuid)
    User = get_user_model()
    try:
        user = User.objects.get(id=user_id)
    except:
        return Response({
            'response': 'error',
            'message': 'profile/{} 를 찾을 수 없습니다.'.format(user_id),
        })
    user.status = "1"
    user.save()

    return Response({
        'response': 'success',
        'message': 'profile 이메일 인증 요청이 성공하였습니다.'
    })


@api_view(['POST', ])
def password_change_email(request):
    username = request.data.get('username')
    if not username:
        return Response({
            'response': 'error',
            'message': 'username 파라미터가 없습니다.'
        })
    User = get_user_model()
    try:
        user = User.objects.get(username=username)
    except:
        return Response({
            'response': 'error',
            'message': 'username 파라미터가 없습니다.'
        })

    uuid = uuid4()
    cache.set(uuid, user.id)
    current_site = get_current_site(request)
    mail_content = render_to_string(
        'myauth/password_change_email.html',
        {
            'domain': current_site.domain,
            'uuid': uuid
        }
    )
    mail_subject = "[LaundryRunner] 비밀번호 변경 메일입니다."
    user_email = user.email
    email = EmailMessage(mail_subject, mail_content, to=[user_email])
    email_result = email.send()
    if email_result == 1:
        return Response({
            'response': 'success',
            'message': '이메일 전송 요청이 성공하였습니다.'
        })
    else:
        return Response({
            'response': 'error',
            'message': '이메일 전송에 실패하였습니다.'
        })


@api_view(['GET', 'POST'])
def password_change(request, uuid):
    if request.method == 'GET':
        user_id = cache.get(uuid)
        User = get_user_model()
        user = User.objects.get(id=user_id)

        if user is None:
            return Response({
                'response': 'error',
                'message': 'user in None',
            })

        return Response({
            'response': 'success',
            'message': 'input your change password.'
        })
    else:
        password = request.data.get('password')
        check_password = request.data.get('check_password')
        if password == check_password:
            user_id = cache.get(uuid)
            User = get_user_model()
            try:
                user = User.objects.get(id=user_id)
            except:
                return Response({
                    'response': 'error',
                    'message': 'profile/{} 를 찾을 수 없습니다.'.format(user_id)
                })
            user.set_password(password)
            user.save()
            return Response({
                'response': 'success',
                'message': '비밀번호 변경 요청이 성공하였습니다.'
            })
        else:
            return Response({
                'response': 'error',
                'message': '비밀번호가 잘못되었습니다.'
            })


def main(request):
    print(request)
    decode_jwt = jwt.decode(
        'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjozfQ.Or7AvvvBw-x48EiVPZaN7gb6lDCOUkBN8Zj7W6JeB6c', settings.SECRET_KEY, 'HS256')
    print(decode_jwt)
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
