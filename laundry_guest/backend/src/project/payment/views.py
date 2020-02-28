from django.shortcuts import render
from rest_framework import permissions
from rest_framework.views import APIView
from rest_framework.response import Response
from laundry.models import LaundryShop, LaundryItem
from .serializers import OrderSerializer, OrderItemSerializer


class OrderView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, laundry_id, *args, **kwargs):
        '''
        # 기능
        주문 생성
        # example
            {
                "pickup_address": "서울시립대 전농동 103-45",
                "pickup_detail_address": "주영리빙텔 109호",
                "delivery_address": "서울시립대학교",
                "delivery_detail_address": "미래관 608호 수리계산연구실",
                "requirement": "기사님 사랑합니다!",
                "orderItems": [{
                        "category": "바지",
                        "quantity": 12,
                        "requirement": "바지 잘 부탁드려요!"
                    },
                    {
                        "category": "셔츠",
                        "quantity": 3,
                        "requirement": "셔츠 구김없이 부탁드려요"
                    }
                ]
            }

        '''
        laundryshop = LaundryShop.objects.get(id=laundry_id)
        profile = request.user
        order_items = request.data.pop('orderItems')
        data = request.data

        FK = dict()
        FK['profile'] = profile
        FK['laundryshop'] = laundryshop
        serializer = OrderSerializer(data=data)
        if serializer.is_valid():
            order = serializer.save(FK=FK)
        else:
            return Response({
                'response': 'error',
                'message': serializer.errors
            })

        total_price = 0
        for order_item in order_items:
            category = order_item['category']
            quantity = order_item['count']
            requirement = order_item['requirement']
            laundry_item = LaundryItem.objects.get(
                laundry_shop=laundryshop, category=category)
            data = dict()
            data['quantity'] = quantity
            data['requirement'] = requirement
            FK = dict()
            FK['order'] = order
            FK['laundry_item'] = laundry_item
            serializer = OrderItemSerializer(data=data)
            if serializer.is_valid():
                order_item = serializer.save(FK=FK)
            else:
                return Response({
                    'response': 'error',
                    'message': serializer.errors
                })
            total_price += laundry_item.price * quantity
        order.total_price = total_price
        order.save()

        return Response({
            'response': 'success',
            'message': 'order와 orderItem이 성공적으로 생성되었습니다.'
        })
