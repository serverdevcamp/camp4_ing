from django.core.cache import cache
from django.contrib.auth import get_user_model
from django.contrib.auth.hashers import check_password
from django.shortcuts import render, redirect
from django.http import Http404
from rest_framework import permissions
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .serializers import ShopSerializer, ProfileSerializer
from .models import Profile
from mylaundry.models import LaundryShop
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
        '''
        회원가입

        ---
                      {
                    "profile": {
                        "profile":{
                            "username": "1",
                            "password": "1234",
                            "email": "sujin0970@naver.com",
                            "nickname": "1",
                            "address": "1",
                            "detail_address": "1",
                            "phone": "1",
                            "business_num": "1"
                        },
                        "name": "1",
                        "tel": "1",
                        "information": "1",
                        "operating_time":[
                            {
                                "days": ["월", "화", "수"],
                                "start_time": "09:30",
                                "end_time": "20:30"
                            },
                            {
                                "days": ["주말"],
                                "start_time": "10:30",
                                "end_time": "18:30"
                            }
                        ],
                        "min_price": "1",
                        "delivery_dt":"1:1"
                    }
                    }
            '''

        data = request.data.get('profile')
        if not data:
            return Response({
                'response': 'error',
                'message': 'profile 파라미터가 없습니다.'
            })
        serializer = ShopSerializer(data=data)

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

    def put(self, request, *args, **kwargs):
        '''
        아이디 중복 검사

        ---
        #유저아이디 '1'이 사용가능한지 확인한다.

            {
                "username": "1"
            }

        '''

        username = request.data.get('username')
        if not username:
            return Response({
               'response': 'error',
               'message': 'username 파라미터가 없습니다.'
            })
        profile = Profile.objects.get(username=username)
        if not profile:
            return Response({
               'response': 'success',
               'message': '사용가능한 아이디 입니다.'
           })
        if profile.status =="0" or profile.status=="1":
            return Response({
                'response': 'success',
                'message': '사용불가능한 아이디 입니다.'
            })

        return Response({
            'response': 'success',
            'message': '사용가능한 아이디 입니다.'
       })





class UserLoginView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request, *args, **kargs):
        '''
        로그인

        ---
            {
                "profile":{
                            "username":"1",
                            "password":"1234"
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
            raise Response({
                'response': 'error',
                'message': 'profile/{} 페이지를 찾을 수 없습니다.'.format(id)
            })

    def get(self, request, id):
        profile = self.get_object(request, id)
        serializer = ProfileSerializer(profile)
        shop = LaundryShop.objects.get(profile=profile)
        shop_serializer = ShopSerializer(shop)

        return Response({
            'response': 'success',
            'message': 'profile 조회 요청이 성공하였습니다.',
            'data': shop_serializer.data
        })

    def put(self, request, id):
        '''
        회원정보 수정

        ---
            {
                "profile" : {
                                "profile":{
                                            "email":"sujin090@nabver.com"
                                },
                                "name":"111"
                }
            }
        '''
        data = request.data.get('profile')
        profile = self.get_object(request, id)
        shop = LaundryShop.objects.get(profile=profile)
        serializer = ShopSerializer(shop, data=data, partial=True)

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
        shop = LaundryShop.objects.get(profile=profile)
        shop.status ='9'
        profile.status = '9'
        return Response({
            'response': 'success',
            'message': 'profile이 성공적으로 탈퇴되었습니다.'
        })


@api_view(['GET', ])
def profile_activate(request, uuid):

    try:
        user_id = cache.get(uuid)
    except:
        return Response({
            'response': 'error',
            'message': 'cache/{} 를 찾을 수 없습니다.'.format(uuid)
        })

    User = get_user_model()

    try:
        user = User.objects.get(id=user_id)
    except:
        return Response({
            'response': 'error',
            'message': 'profile/{} 를 찾을 수 없습니다.'.format(user_id)
        })
    user.status = "1"
    user.save()

    return Response({
        'response': 'success',
        'message': 'profile 이메일 인증 요청이 성공하였습니다.'
    })


@api_view(['POST', ])
def password_change_email(request):
    '''
    비밀번호 수정 이메일 전송

           ---

               {
                   "username": "1"
               }

           '''
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
    '''
    비밀번호 수정

    ---
    #post일 경우
    
        {
            "password":"1234",
            "check_password":"1234"
        }


    '''
    if request.method == 'GET':
        user_id = cache.get(uuid)
        User = get_user_model()
        user = User.objects.get(id=user_id)

        if user is None:
            return Response({
                'response': 'error',
                'message': 'profile/{} 를 찾을 수 없습니다.'.format(user_id)
            })

        return Response({
            'response': 'success',
            'message': '새로운 비밀번호를 입력하세요.'
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
        'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjozfQ.Or7AvvvBw-x48EiVPZaN7gb6lDCOUkBN8Zj7W6JeB6c',
        settings.SECRET_KEY, 'HS256')
    print(decode_jwt)
    return render(request, 'myauth/main.html')



def jwt_create(username):
    now = datetime.now()
    key = settings.SECRET_KEY
    now_time = str(now.year) + str(now.month) + str(now.day) + \
               str(now.hour) + str(now.minute) + str(now.second)

    payload = {
        "username": username,
        "now_time": now_time
    }

    token = jwt.encode(payload, key, algorithm='HS256').decode('utf-8')
    return token


