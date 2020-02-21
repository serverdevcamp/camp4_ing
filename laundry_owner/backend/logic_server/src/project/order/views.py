from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import OrderSerializer, OrderDetailSerializer
from mylaundry.models import LaundryShop, Review
from .models import Order, OrderItem
from django.utils.timezone import now
from django.db.models import Q

class OrderView(APIView):
    def get(self, request, shop_id, *args, **kwargs):
        #cache에서 laundry shop 개체 구분하기
        laundry_shop = LaundryShop.objects.get(id=shop_id)
        queryset = Order.objects.filter(laundry_shop=laundry_shop).exclude(Q(status='cancelled')&Q(status='failed')&Q(status='ready'))
        serializer = OrderSerializer(queryset, many=True)
        return Response({
            'response': 'success',
            'message': '{} 세탁소의 주문 조회 요청이 성공하였습니다.'.format(shop_id),
            'laundryshop_status': laundry_shop.status,
            'data': serializer.data
        })


class OrderView_waitng(APIView):
    def get(self, request, shop_id, *args, **kwargs):
        #cache에서 laundry shop 개체 구분하기
        laundry_shop = LaundryShop.objects.get(id=shop_id)
        queryset = Order.objects.filter(laundry_shop=laundry_shop, status="waiting").order_by('created_at')
        serializer = OrderSerializer(queryset, many=True)
        return Response({
            'response': 'success',
            'message': '{} 세탁소의 대기주문 조회 요청이 성공하였습니다.'.format(shop_id),
            'status': laundry_shop.status,
            'data': serializer.data
        })



class OrderView_processing(APIView):
    def get(self, request, shop_id, *args, **kwargs):
        #cache에서 laundry shop 개체 구분하기
        laundry_shop = LaundryShop.objects.get(id=shop_id)
        queryset = Order.objects.filter(laundry_shop=laundry_shop, status="processing").order_by('created_at')
        serializer = OrderSerializer(queryset, many=True)
        return Response({
            'response': 'success',
            'message': '{} 세탁소의 처리중인 주문 조회 요청이 성공하였습니다.'.format(shop_id),
            'status': laundry_shop.status,
            'data': serializer.data
        })



class OrderView_finished(APIView):
    def get(self, request, shop_id, *args, **kwargs):
        #cache에서 laundry shop 개체 구분하기
        laundry_shop = LaundryShop.objects.get(id=shop_id)
        queryset = Order.objects.filter(laundry_shop=laundry_shop, status="finished").order_by('-created_at')
        serializer = OrderSerializer(queryset, many=True)
        return Response({
            'response': 'success',
            'message': '{} 세탁소의 완료된 주문 조회 요청이 성공하였습니다.'.format(shop_id),
            'status': laundry_shop.status,
            'data': serializer.data
        })



class OrderDetailView(APIView):

    def get_object(self, request, order_id):
        try:
            return Order.objects.get(id=order_id)
        except:
            return Response({
                'response': 'error',
                'message': 'order/{} 을 찾을 수 없습니다.'.format(order_id)
            })

    def get(self, request, shop_id, order_id, *args, **kwargs):
        order = self.get_object(request, order_id)
        laundry_shop= order.laundry_shop
        if order is None:
            return Response({
                'response': 'error',
                'message': '{}order를 찾을 수 없습니다.'.format(order_id)
            })
        serializer = OrderDetailSerializer(order)
        return Response({
            'response': 'success',
            'message': 'order 조회 요청이 성공하였습니다.',
            'status': laundry_shop.status,
            'data': serializer.data
        })

    def put(self, request, shop_id, order_id, *args, **kwargs):
        '''
        빨래 상태 변화

        ---
        #이 중에 하나

            {
                "status":"waiting"
            }
            {
                "status":"process"
            }
            {
                "status":"finished"
            }
        '''
        order = Order.objects.get(id=order_id)
        data = request.data.get('status')
        order.status = data
        order.updated_at = now()
        order.save()
        return Response({
            'response': 'success',
            'message': 'status가 성공적으로 수정되었습니다.'
        })



