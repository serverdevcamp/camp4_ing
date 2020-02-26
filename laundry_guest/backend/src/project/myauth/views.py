from django.core.cache import cache
from django.core.exceptions import ObjectDoesNotExist
from django.contrib.auth import get_user_model, authenticate
from django.contrib.auth.hashers import check_password
from django.shortcuts import render, redirect
from django.http import Http404
from django.contrib import auth
from rest_framework import permissions
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from .serializers import ProfileSerializer
from .models import Profile
from config.permissions import IsOwnerOnly
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

    def get(self, request, *args, **kwargs):
        '''
        # 기능
        전체 유저 조회

        '''
        queryset = get_user_model().objects.all()
        serializer = ProfileSerializer(queryset, many=True)
        return Response(serializer.data)

    def post(self, request, *args, **kwargs):
        '''
        # 기능
        회원 가입
        # example
            {
                "profile": {
                    "username": "rkdalstjd1",
                    "password": "password1",
                    "email": "rkdalstjd9@naver.com",
                    "nickname": "사장님2",
                    "address": "서울특별시 동대문구 전농동",
                    "detail_address": "주영리빙텔 109호",
                    "phone": "01000000000"
                }
            }
        '''
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


class UserLoginView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request, *args, **kargs):
        '''
        # 기능
        로그인
        # example
            {
                "profile": {
                    "username": "rkdalstjd1",
                    "password": "password1"
                }
            }
        '''
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
                'message': '해당 아이디가 존재하지 않습니다.',
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
@permission_classes((permissions.IsAuthenticated,))
def logout(request):
    '''
    # 기능
    로그아웃
    '''
    auth.logout(request)
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
    permission_classes = [IsOwnerOnly]

    def get_object(self, id):
        try:
            profile = Profile.objects.get(id=id)
            self.check_object_permissions(self.request, profile)
            return profile
        except ObjectDoesNotExist:
            return None

    def get(self, request, id):
        '''
        # 기능
        유저 세부 조회
        '''
        profile = self.get_object(id)
        if profile is None:
            return Response({
                'response': 'error',
                'message': 'profile/{} 페이지를 찾을 수 없습니다.'.format(id)
            })
        serializer = ProfileSerializer(profile)
        return Response({
            'response': 'success',
            'message': 'profile 조회 요청이 성공하였습니다.',
            'data': serializer.data
        })

    def put(self, request, id):
        """
        # 기능
        유저 정보 수정
        # example
            {
               "data": {
                    "nickname": "사장님2"
                }
            }
        """
        # data = request.data.get('profile')
        # if not data:
        #     return Response({
        #         'response': 'error',
        #         'message': 'profile 파라미터가 없습니다.'
        #     })
        data = request.data.get('data')
        if data is None:
            return Response({
                'response': 'error',
                'message': 'data 파라미터가 없습니다.'
            })
        profile = self.get_object(id)
        if profile is None:
            return Response({
                'response': 'error',
                'message': 'profile/{} 페이지를 찾을 수 없습니다.'.format(id)
            })
        serializer = ProfileSerializer(
            profile, data=data, partial=True)
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
        """
        # 기능
        유저 정보 삭제<br>
        (실제로 삭제하지는 않고 status 를 9로 변경)

        """
        profile = self.get_object(id)
        profile.status = '9'
        return Response({
            'response': 'success',
            'message': 'profile이 성공적으로 삭제되었습니다.'
        })


@api_view(['GET', ])
@permission_classes((permissions.AllowAny,))
def profile_activate(request, uuid):
    """
    기능
    유저 계정 활성화
    """
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
@permission_classes((permissions.AllowAny,))
def password_change_email(request):
    """
    # 기능
    비밀번호 변경 메일 전송
    # example
        {
            "username": "rkdalstjd0"
        }

    """
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
@permission_classes((permissions.AllowAny,))
def password_change(request, uuid):
    """
    # 기능
    비밀번호 변경 메일 전송
    # example
        {
            "password": "바뀐 비밀번호",
            "check_password": "바뀐 비밀번호"
        }
    """
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


@api_view(['GET', ])
@permission_classes((permissions.AllowAny,))
def check_duplicate(request, username):
    try:
        profile = Profile.objects.get(username=username)
    except:
        return Response({
            'response': 'success',
            'message': '사용할 수 있는 아이디입니다.'
        })
    return Response({
        'response': 'error',
        'message': '이미 존재하는 아이디입니다.'
    })


@api_view(['GET', ])
@permission_classes((IsOwnerOnly))
def get_user_id(request, username):
    """
    # 기능
    유저 이름으로 id 조회

    """
    try:
        profile = Profile.objects.get(username=username)
    except:
        return Response({
            'response': 'error',
            'message': '{}을 찾을 수 없습니다.'.format(username)
        })
    return Response({
        'response': 'success',
        'message': '{}에 해당하는 id를 찾았습니다.'.format(username),
        'data': profile.id
    })


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
