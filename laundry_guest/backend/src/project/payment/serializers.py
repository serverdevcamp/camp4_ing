from rest_framework import serializers as sz
from .models import Order, OrderItem


class OrderSerializer(sz.ModelSerializer):
    def create(self, validated_data):
        order = Order(
            profile=validated_data['FK']['profile'],
            laundry_shop=validated_data['FK']['laundryshop']
        )
        order.save()
        return order

    class Meta:
        model = Order
        fields = []


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
