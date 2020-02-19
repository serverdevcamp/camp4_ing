from rest_framework import serializers as sz
from .models import Profile
from django.contrib.auth import get_user_model

from laundry.models import LaundryShop


class ProfileSerializer(sz.ModelSerializer):
    password = sz.CharField()

    def create(self, validated_data):
        User = get_user_model()
        user = User(
            username=validated_data['username'],
            email=validated_data['email'],
            nickname=validated_data['nickname'],
            address=validated_data['address'],
            detail_address=validated_data['detail_address'],
            phone=validated_data['phone'],
        )
        user.set_password(validated_data['password'])
        user.status = "0"
        user.role = "0"
        user.save()
        return user

    class Meta:
        model = get_user_model()
        fields = ['username', 'password', 'email',
                  'nickname', 'address', 'detail_address', 'phone']
