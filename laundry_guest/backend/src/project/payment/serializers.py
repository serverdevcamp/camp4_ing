from rest_framework import serializers as sz
from .models import Order, OrderItem


class OrderSerializer(sz.ModelSerializer):
    def create(self, validated_data):
        FK = validated_data.pop('FK')
        order = Order(
            profile=FK['profile'],
            laundry_shop=FK['laundryshop'],
            **validated_data
        )
        order.save()
        return order

    class Meta:
        model = Order
        fields = [
            'pickup_address',
            'pickup_detail_address',
            'delivery_address',
            'delivery_detail_address',
            'requirement'
        ]


class OrderItemSerializer(sz.ModelSerializer):

    def create(self, validated_data):
        order_item = OrderItem(
            order=validated_data['FK']['order'],
            laundry_item=validated_data['FK']['laundry_item'],
            quantity=validated_data['quantity']
        )
        order_item.save()
        return order_item

    class Meta:
        model = OrderItem
        fields = ['quantity']
