from rest_framework import serializers as sz
from rest_framework.response import Response
from .models import Profile
from mylaundry.models import LaundryShop
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
        user.role = "5"
        user.save()
        return user

    class Meta:
        model = get_user_model()
        fields = ['username', 'password', 'email',
                  'nickname', 'address', 'detail_address', 'phone', 'business_num'
                  ]


class ShopSerializer(sz.ModelSerializer):
    profile = ProfileSerializer()
    id =sz.CharField(read_only=True)

    def create(self, validated_data):
        profile_data = validated_data.pop('profile')
        profile = ProfileSerializer.create(ProfileSerializer(), validated_data=profile_data)
        laundryshop, created = LaundryShop.objects.update_or_create(
            profile=profile,
            name=validated_data.pop('name'),
            tel=validated_data.pop('tel'),
            information=validated_data.pop('information'),
            operating_time=validated_data.pop('operating_time'),
            min_price=validated_data.pop('min_price'),
            delivery_dt=validated_data.pop('delivery_dt'),
        )
        laundryshop.grade = 0
        laundryshop.like_num= 0
        laundryshop.status="0"
        laundryshop.save()
        return profile


    def update(self, instance,validated_data):
        # print(instance)
        # print(validated_data)
        nested_serializer = self.fields['profile']
        nested_instance = instance.profile
        nested_data = validated_data.pop('profile')
        nested_serializer.update(nested_instance, nested_data)
        return super(ShopSerializer, self).update(instance, validated_data)

    class Meta:
        model = LaundryShop
        fields = [
                  'id','name', 'tel', 'information', 'operating_time', 'min_price', 'delivery_dt', 'profile'
                  ]




