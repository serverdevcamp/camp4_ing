from rest_framework import serializers as sz
from .models import Profile
from django.contrib.auth import get_user_model


class ProfileSerializer(sz.ModelSerializer):
    username = sz.CharField()
    password = sz.CharField()
    email = sz.CharField()

    def create(self, validated_data):
        User = get_user_model()
        user = User(
            username=validated_data['username'],
            email=validated_data['email'],
        )
        user.set_password(validated_data['password'])
        user.is_active = False
        user.save()
        profile = Profile(
            user=user,
            nickname=validated_data['nickname'],
            address=validated_data['address'],
            phone=validated_data['phone'],
            business_num=validated_data['business_num'],
        )
        profile.save()
        return profile

    class Meta:
        model = Profile
        fields = ['username', 'password', 'email',
                  'nickname', 'address', 'phone', 'business_num']
