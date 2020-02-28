from django.shortcuts import render
from django.core.exceptions import ObjectDoesNotExist
from django.core.cache import cache
from rest_framework import permissions
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.exceptions import APIException
from rest_framework.decorators import api_view, permission_classes
from rest_framework.renderers import JSONRenderer
import json
from .serializers import LaundryShopSerializer, LaundryShopDetailSerializer, ReviewSerializer, OrderForReviewSerializer, OrderForReviewDetailSerializer, ReviewInOrderSerializer
from .models import LaundryShop, Review, Like
from payment.models import Order
from payment.serializers import OrderSerializer

from django.core.serializers.json import DjangoJSONEncoder
from django.db.models.query import QuerySet
from django.http import JsonResponse
from config.permissions import IsOwnerOnly, IsOwnerOrReadOnly


class LaundryShopView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, *args, **kwargs):
        '''
        # 기능
        전체 세탁소 조회

        '''
        try:
            queryset = LaundryShop.objects.all()
        except:
            return Response({
                'response': 'error',
                'message': 'laundry shop 목록을 찾을 수 없습니다.'
            })
        serializer = LaundryShopSerializer(queryset, many=True)
        return Response({
            'response': 'success',
            'message': '세탁소 조회 요청에 성공하였습니다.',
            'data': serializer.data
        })


class LaundryShopDetailView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self, id):
        try:
            return LaundryShop.objects.get(id=id)
        except ObjectDoesNotExist:
            return None

    def get(self, request, id, *args, **kwargs):
        laundry_shop = self.get_object(id)
        if laundry_shop is None:
            return Response({
                'response': 'error',
                'message': '{} laundry shop 를 찾을 수 없습니다.'.format(id)
            })
        serializer = LaundryShopDetailSerializer(laundry_shop)
        return Response({
            'response': 'success',
            'message': 'laundry shop 조회 요청이 성공하였습니다.',
            'data': serializer.data
        })


class ReviewView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, id, *args, **kwargs):
        '''
        # 기능
        {id}세탁소의 전체 리뷰 조회

        '''
        laundry_shop = LaundryShop.objects.get(id=id)
        queryset = Review.objects.filter(laundryshop=laundry_shop)
        serializer = ReviewSerializer(queryset, many=True)
        return Response({
            'response': 'success',
            'message': '{} laundry shop의 review 조회 요청이 성공하였습니다.'.format(id),
            'data': serializer.data
        })

    def post(self, request, id, *args, **kwargs):
        '''
        # 기능
        {id}세탁소에 리뷰 생성
        # example
            {
                "review": {
                    "content": "{}세탁소 최고!",
                    "grade": 3,
                    "image": {
                        "imageUrls": ["이미지주소1", "   "]
                    }
                }
            }
        '''
        try:
            data = request.data['review']
        except:
            return Response({
                'response': 'error',
                'message': 'review 파라미터가 없습니다.'
            })
        FK = dict()
        FK['profile_id'] = request.user.id
        FK['laundry_id'] = id

        serializer = ReviewSerializer(data=data)
        if serializer.is_valid():
            review = serializer.save(FK=FK)
        else:
            return Response({
                'response': 'error',
                'message': serializer.errors
            })
        return Response({
            'response': 'success',
            'message': 'review 가 성공적으로 생성되었습니다.'
        })


class ReviewDetailView(APIView):
    permission_classes = [IsOwnerOrReadOnly]

    def get_object(self, review_id):
        try:
            review = Review.objects.get(id=review_id)
            self.check_object_permissions(self.request, review)
            return review
        except ObjectDoesNotExist:
            return None

    def get(self, request, id, review_id):
        '''
        # 기능
        {id}세탁소의 {review_id}리뷰 상세 조회

        '''
        review = self.get_object(review_id)
        if review is None:
            return Response({
                'response': 'error',
                'message': '{} review를 찾을 수 없습니다.'.format(review_id)
            })
        serializer = ReviewSerializer(review)
        return Response({
            'response': 'success',
            'message': 'review 조회 요청이 성공하였습니다.',
            'data': serializer.data
        })

    def put(self, request, id, review_id):
        '''
        # 기능
        {id}세탁소의 {review_id}리뷰 수정
        # example
            {
                "content": "스마일 세탁소 사랑해요!"
            }

        '''
        review = self.get_object(review_id)
        if review is None:
            return Response({
                'response': 'error',
                'message': '{} review를 찾을 수 없습니다.'.format(review_id)
            })
        serializer = ReviewSerializer(review, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response({
                'response': 'sucess',
                'message': 'review가 성공적으로 수정되었습니다.',
                'data': serializer.data
            })
        else:
            return Response({
                'response': 'error',
                'message': serializer.errors
            })

    def delete(self, request, id, review_id):
        '''
        # 기능
        {id}세탁소의 {review_id}리뷰 삭제

        '''

        review = self.get_object(review_id)
        if review is None:
            return Response({
                'response': 'error',
                'message': '{} review를 찾을 수 없습니다.'.format(id)
            })
        try:
            review.delete()
        except:
            return Response({
                'response': 'error',
                'message': 'db에서 삭제에 실패했습니다.'
            })

        return Response({
            'response': 'error',
            'message': 'review가 성공적으로 삭제되었습니다.'
        })


class LaundryShopLikeView(APIView):
    permission_classes = [IsOwnerOnly]

    def post(self, request, id, *args, **kwargs):
        '''
        # 기능
        {id}세탁소의 좋아요 토글

        '''
        profile = request.user
        try:
            laundryshop = LaundryShop.objects.get(id=id)
        except ObjectDoesNotExist:
            return Response({
                'response': 'error',
                'message': '{} laundry shop을 찾을 수 없습니다.'.format(id)
            })

        is_liked = False

        try:
            like = Like.objects.get(profile=profile, laundryshop=laundryshop)
        except ObjectDoesNotExist:
            like = Like(
                profile=profile,
                laundryshop=laundryshop
            )
            like.save()
            is_liked = True

        if not is_liked:
            like.delete()

        try:
            laundryshop.like_num += -1 if is_liked else 1
            laundryshop.save()
        except:
            return Response({
                'response': 'error',
                'message': 'db에서 좋아요 수 변화에 실패했습니다.'
            })

        return Response({
            'response': 'success',
            'message': 'like가 성공적으로 변화되었습니다.'
        })
    # post 요청시 좋아요 수 토글로 변경함에 따라 delete 사용 X
    # def delete(self, request, id, *args, **kwargs):
        # profile = request.user
        # try:
        #     laundryshop = LaundryShop.objects.get(id=id)
        # except ObjectDoesNotExist:
        #     return Response({
        #         'response': 'error',
        #         'message': '{} laundry shop을 찾을 수 없습니다.'.format(id)
        #     })
        # try:
        #     like = Like.objects.get(
        #         profile=profile,
        #         laundryshop=laundryshop
        #     )
        # except ObjectDoesNotExist:
        #     return Response({
        #         'response': 'error',
        #         'message': '{} profile의 {}laundry shop에 대한 like를 찾을 수 없습니다.'.format(profile.id, id)
        #     })
        # try:
        #     like.delete()
        # except:
        #     return Response({
        #         'response': 'error',
        #         'message': 'db에서 삭제에 실패했습니다.'
        #     })
        # try:
        #     laundryshop.like_num -= 1
        #     laundryshop.save()
        # except:
        #     return Response({
        #         'response': 'error',
        #         'message': 'db에서 좋아요 수 감소에 실패했습니다.'
        #     })

        # return Response({
        #     'response': 'success',
        #     'message': 'like가 성공적으로 삭제되었습니다.'
        # })


class OrderForReviewView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, is_reviewd, *args, **kwargs):
        '''
        # 기능
        사용자가 한 주문
        # parameter
        is_reviewd : True / False
        * True일 경우 : 리뷰가 있는 order
        * False일 경우 : 리뷰가 없는 order

        '''

        profile = request.user
        orders = ""
        # 사용자가 한 주문 중에 review 를 남긴 주문
        if is_reviewd == "True":
            orders = Order.objects.filter(profile=profile).exclude(review=None)
        elif is_reviewd == "False":
            orders = Order.objects.filter(profile=profile, review=None)
        else:
            orders = Order.objects.filter(profile=profile)

        serializer = OrderForReviewSerializer(orders, many=True)

        new_serializer_data = list(serializer.data)

        for order in new_serializer_data:
            laundry_shop = LaundryShop.objects.get(id=order['laundry_shop'])
            order['laundry_shop'] = laundry_shop.name
            print(order['laundry_shop'])

        return Response({
            'response': 'success',
            'message': 'order 조회 요청에 성공하였습니다.',
            'data': new_serializer_data
        })


class OrderForReviewDetailView(APIView):
    permission_classes = [IsOwnerOnly]

    def get_object(self, order_id):
        try:
            order = Order.objects.get(id=order_id)
            self.check_object_permissions(self.request, order)
            return order
        except ObjectDoesNotExist:
            return None

    def get(self, request, order_id, *args, **kwargs):
        '''
        # 기능
        주문에 해당되는 리뷰 상세 조회

        '''
        order = self.get_object(order_id)
        if order is None:
            return Response({
                'response': 'error',
                'message': '{} order를 찾을 수 없습니다.'.format(order_id)
            })
        serializer = OrderForReviewDetailSerializer(order)
        return Response({
            'response': 'success',
            'message': 'order 조회 요청에 성공하였습니다.',
            'data': serializer.data
        })

    def post(self, request, order_id, *args, **kwargs):
        '''
        # 기능
        주문에 해당되는 리뷰 생성
        # example
            {
                "review": {
                    "content": "스마일세탁소가 제일 깨끗해요!!",
                    "grade": 3,
                    "image": {
                        "imageUrls": ["이미지주소1", "   "]
                    }
                }
            }

        '''
        try:
            data = request.data['review']
        except:
            return Response({
                'response': 'error',
                'message': 'review 파라미터가 없습니다.'
            })
        FK = dict()
        FK['profile'] = request.user
        FK['order'] = self.get_object(order_id)

        serializer = ReviewInOrderSerializer(data=data)
        if serializer.is_valid():
            review = serializer.save(FK=FK)
        else:
            return Response({
                'response': 'error',
                'message': serializer.errors
            })
        return Response({
            'response': 'success',
            'message': 'review가 성공적으로 생성되었습니다.'
        })


@api_view(['GET', ])
@permission_classes((permissions.IsAuthenticated))
def laundry_search(request, laundry_name):
    try:
        laundry = LaundryShop.objects.get(name=laundry_name)
    except ObjectDoesNotExist:
        return Response({
            'response': 'error',
            'message': 'laundry id 조회요청에 실패하였습니다.',
        })
    return Response({
        'response': 'success',
        'message': 'laundry id 조회요청에 성공하였습니다.',
        'data': laundry.id
    })
