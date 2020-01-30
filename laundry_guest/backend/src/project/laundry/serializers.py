from rest_framework import serializers as sz
from .models import LaundryShop, LaundryItem, Like, Review


class LaundryShopSerializer(sz.ModelSerializer):
    class Meta:
        model = LaundryShop
#        fields = '__all__'
        fields = ['name', 'tel', 'information',
                  'operating_time', 'min_price', 'grade', 'delivery_dt']
