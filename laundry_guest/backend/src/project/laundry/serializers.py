from rest_framework import serializers as sz
from .models import LaundryShop, LaundryItem, Like, Review
from myauth.models import Profile
from payment.models import Order


class LaundryShopSerializer(sz.ModelSerializer):
    class Meta:
        model = LaundryShop
#        fields = '__all__'
        fields = [
            'name', 'tel', 'information', 'operating_time', 'min_price', 'grade', 'delivery_dt', 'like_num'
        ]


class LaundryItemSerializer(sz.ModelSerializer):
    laundry_shop = sz.PrimaryKeyRelatedField(
        queryset=LaundryShop.objects.all())

    class Meta:
        model = LaundryItem
        fields = ('category', 'material', 'price', 'laundry_shop')


class LaundryShopDetailSerializer(sz.ModelSerializer):
    laundry_item = LaundryItemSerializer(many=True, read_only=True)

    class Meta:
        model = LaundryShop
        fields = (
            'name', 'tel', 'information', 'operating_time', 'min_price', 'grade', 'delivery_dt', 'like_num', 'laundry_item'
        )


class ReviewSerializer(sz.ModelSerializer):
    profile_id = sz.CharField(required=False)
    laundryshop_id = sz.CharField(required=False)

    def create(self, validated_data):
        review = Review(
            content=validated_data['content'],
            grade=validated_data['grade'],
            image=validated_data['image']
        )
        profile = Profile.objects.get(id=validated_data['FK']['profile_id'])
        laundryshop = LaundryShop.objects.get(
            id=validated_data['FK']['laundry_id'])
        review.profile = profile
        review.laundryshop = laundryshop
        review.save()
        return review

    class Meta:
        model = Review
        fields = (
            'profile_id', 'laundryshop_id', 'content', 'grade', 'image'
        )


class OrderForReviewSerializer(sz.ModelSerializer):

    class Meta:
        model = Order
        fields = [
            'laundry_shop',
            'created_at',
        ]
