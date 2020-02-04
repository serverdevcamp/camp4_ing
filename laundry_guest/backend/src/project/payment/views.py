from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from laundry.models import LaundryShop, LaundryItem
from .serializers import OrderSerializer, OrderItemSerializer


class OrderView(APIView):
    def post(self, request, laundry_id, *args, **kwargs):
        laundryshop = LaundryShop.objects.get(id=laundry_id)
        profile = request.user

        FK = dict()
        FK['profile'] = profile
        FK['laundryshop'] = laundryshop
        serializer = OrderSerializer(data={})
        if serializer.is_valid():
            order = serializer.save(FK=FK)
        else:
            return Response({
                'response': 'error',
                'message': serializer.errors
            })
        order_items = request.data['orderItems']
        total_price = 0
        for order_item in order_items:
            category = order_item['category']
            quantity = order_item['quantity']

            laundry_item = LaundryItem.objects.get(
                laundry_shop=laundryshop, category=category)
            FK = dict()
            FK['order'] = order
            FK['laundry_item'] = laundry_item
            serializer = OrderItemSerializer(data={'quantity': quantity})
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
