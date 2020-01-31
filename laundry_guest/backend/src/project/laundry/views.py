from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import LaundryShopSerializer
from .models import LaundryShop


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
            queryset = LaundryShop.objects.get(id=id)
        except:
            return Response({
                'response': 'error',
                'message': 'laundry shop/{} 을 찾을 수 없습니다.'.format(id)
            })

    def get(self, request, id, *args, **kwargs):
        laundry_shop = self.get_object(id)
        serializer = LaundryShopSerializer(laundry_shop)
        return Response({
            'response': 'success',
            'message': 'laundry shop 조회 요청이 성공하였습니다.',
            'data': serializer.data
        })
