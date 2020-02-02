from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import LaundryShopSerializer, LaundryShopDetailSerializer, ReviewSerializer
from .models import LaundryShop, Review


class LaundryShopView(APIView):

    def get(self, request, *args, **kwargs):
        try:
            queryset = LaundryShop.objects.all()
        except:
            return Response({
                'response': 'error',
                'message': '세탁소 목록을 찾을 수 없습니다.'
            })
        serializer = LaundryShopSerializer(queryset, many=True)
        return Response(serializer.data)


class LaundryShopDetailView(APIView):

    def get_object(self, request, id):
        try:
            return LaundryShop.objects.get(id=id)
        except:
            return Response({
                'response': 'error',
                'message': 'laundry shop/{} 을 찾을 수 없습니다.'.format(id)
            })

    def get(self, request, id, *args, **kwargs):
        laundry_shop = self.get_object(request, id)
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
            'message': '{} 세탁소의 리뷰 조회 요청이 성공하였습니다.'.format(id),
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
