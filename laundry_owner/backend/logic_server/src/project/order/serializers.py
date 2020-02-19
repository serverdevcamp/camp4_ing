from rest_framework import serializers as sz
from .models import Order, OrderItem
from mylaundry.models import LaundryItem
from django.contrib.auth import get_user_model

class  LaundryItemSerializer(sz.ModelSerializer):
    class Meta:
        model = LaundryItem
        fields =('category', 'material')

class OrderItemSerializer(sz.ModelSerializer):
    laundry_item = LaundryItemSerializer(read_only=True)
    class Meta:
        model = OrderItem
        fields = ('laundry_item', 'quantity')


class OrderSerializer(sz.ModelSerializer):
    orderitem =OrderItemSerializer(many=True, read_only=True)
    class Meta:
        model = Order
        fields = ('id','orderitem', 'total_price', 'pickup_address', 'delivery_address', 'status', 'created_at', 'updated_at',)

class ProfileSerializer(sz.ModelSerializer):
    class Meta:
        model = get_user_model()
        fields = ['username', 'email',
                  'nickname', 'phone'
                  ]



class OrderItemDetailSerializer(sz.ModelSerializer):
    class Meta:
        model = OrderItem
        fields = ('laundry_item', 'quantity', 'requirement')

class OrderDetailSerializer(sz.ModelSerializer):
    profile = ProfileSerializer()
    orderitem = OrderItemDetailSerializer(many=True, read_only=True)

    class Meta:
        model = Order
        fields = (
            'profile', 'total_price', 'payment_method', 'status', 'pickup_address', 'pickup_detail_address', 'delivery_address', 'delivery_detail_address', 'created_at', 'updated_at', 'orderitem'
        )



