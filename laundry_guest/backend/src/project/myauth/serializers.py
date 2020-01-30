from rest_framework import serializers as sz
from .models import Profile
from django.contrib.auth import get_user_model


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
            business_num=validated_data['business_num']
        )
        user.set_password(validated_data['password'])
        user.satatus = "0"
        user.role = "0"
        user.save()
        return user

    class Meta:
        model = get_user_model()
        fields = ['username', 'password', 'email',
                  'nickname', 'address', 'detail_address', 'phone', 'business_num']
