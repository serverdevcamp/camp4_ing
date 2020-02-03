from django.shortcuts import render
from django.core.cache import cache
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.exceptions import APIException
from .serializers import LaundryShopSerializer, LaundryShopDetailSerializer, ReviewSerializer
from .models import LaundryShop, Review, Like
from django.core.exceptions import ObjectDoesNotExist


class LaundryShopView(APIView):
    def get(self, request, *args, **kwargs):
        try:
            queryset = LaundryShop.objects.all()
        except:
            return Response({
                'response': 'error',
                'message': 'laundry shop 목록을 찾을 수 없습니다.'
            })
        serializer = LaundryShopSerializer(queryset, many=True)
        return Response(serializer.data)


class LaundryShopDetailView(APIView):

    def get_object(self, request, id):
        try:
            return LaundryShop.objects.get(id=id)
        except ObjectDoesNotExist:
            return None

    def get(self, request, id, *args, **kwargs):
        laundry_shop = self.get_object(request, id)
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
    def get(self, request, id, *args, **kwargs):
        laundry_shop = LaundryShop.objects.get(id=id)
        queryset = Review.objects.filter(laundryshop=laundry_shop)
        serializer = ReviewSerializer(queryset, many=True)
        return Response({
            'response': 'success',
            'message': '{} laundry shop의 review 조회 요청이 성공하였습니다.'.format(id),
            'data': serializer.data
        })

    def post(self, request, id, *args, **kwargs):
        data = request.data['review']
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
    def get_object(self, request, review_id):
        try:
            return Review.objects.get(id=review_id)
        except ObjectDoesNotExist:
            return None

    def get(self, request, id, review_id):
        review = self.get_object(request, review_id)
        if review is None:
            return Response({
                'response': 'error',
                'message': '{} review를 찾을 수 없습니다.'.format(id)
            })
        serializer = ReviewSerializer(review)
        return Response({
            'response': 'success',
            'message': 'review 조회 요청이 성공하였습니다.',
            'data': serializer.data
        })

    def put(self, request, id, review_id):
        review = self.get_object(request, review_id)
        if review is None:
            return Response({
                'response': 'error',
                'message': '{} review를 찾을 수 없습니다.'.format(id)
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
        review = self.get_object(request, review_id)
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
    def post(self, request, id, *args, **kwargs):
        profile = request.user
        try:
            laundryshop = LaundryShop.objects.get(id=id)
        except ObjectDoesNotExist:
            return Response({
                'response': 'error',
                'message': '{} laundry shop을 찾을 수 없습니다.'.format(id)
            })

        like = Like(
            profile=profile,
            laundryshop=laundryshop
        )
        try:
            like.save()
        except:
            return Response({
                'response': 'error',
                'message': 'db에서 생성에 실패했습니다.'
            })
        try:
            laundryshop.like_num += 1
            laundryshop.save()
        except:
            return Response({
                'response': 'error',
                'message': 'db에서 좋아요 수 증가에 실패했습니다.'
            })

        return Response({
            'response': 'success',
            'message': 'like가 성공적으로 생성되었습니다.'
        })

    def delete(self, request, id, *args, **kwargs):
        profile = request.user
        try:
            laundryshop = LaundryShop.objects.get(id=id)
        except ObjectDoesNotExist:
            return Response({
                'response': 'error',
                'message': '{} laundry shop을 찾을 수 없습니다.'.format(id)
            })
        try:
            like = Like.objects.get(
                profile=profile,
                laundryshop=laundryshop
            )
        except ObjectDoesNotExist:
            return Response({
                'response': 'error',
                'message': '{} profile의 {}laundry shop에 대한 like를 찾을 수 없습니다.'.format(profile.id, id)
            })
        try:
            like.delete()
        except:
            return Response({
                'response': 'error',
                'message': 'db에서 삭제에 실패했습니다.'
            })
        try:
            laundryshop.like_num -= 1
            laundryshop.save()
        except:
            return Response({
                'response': 'error',
                'message': 'db에서 좋아요 수 감소에 실패했습니다.'
            })

        return Response({
            'response': 'success',
            'message': 'like가 성공적으로 삭제되었습니다.'
        })
