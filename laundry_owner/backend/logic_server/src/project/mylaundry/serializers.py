from rest_framework import serializers as sz
from .models import LaundryShop, LaundryItem, Like, Review
from order.models import Order, OrderItem
from myauth.models import Profile
from django.contrib.auth import get_user_model


class LaundryShopSerializer(sz.ModelSerializer):
    class Meta:
        model = LaundryShop
        fields = '__all__'


class LaundryItemSerializer(sz.ModelSerializer):
    id = sz.CharField(read_only=True)

    laundryshop_id = sz. CharField(required=False)

    def create(self, validated_data):
        laundryitem = LaundryItem(
            category=validated_data['category'],
            material =validated_data['material'],
            price=validated_data['price'],
            information=validated_data['information']
        )
        laundryshop = LaundryShop.objects.get(
            id=validated_data['FK']['laundry_id'])
        print(laundryshop)
        laundryitem.laundry_shop=laundryshop
        laundryitem.save()
        return laundryitem

    class Meta:
        model = LaundryItem
        fields = ('id','category', 'material', 'price', 'information', 'laundryshop_id')


class LaundryShopDetailSerializer(sz.ModelSerializer):
    laundry_item = LaundryItemSerializer(many=True, read_only=True)

    class Meta:
        model = LaundryShop
        fields = (
            'name', 'tel', 'information', 'operating_time', 'min_price', 'grade', 'delivery_dt', 'laundry_item'
        )



class OrderItemSerializer(sz.ModelSerializer):
    class Meta:
        model = OrderItem
        fields = ('laundry_item', 'quantity')


class OrderSerializer(sz.ModelSerializer):
    orderitem =OrderItemSerializer(many=True, read_only=True)
    class Meta:
        model = Order
        fields = ('orderitem', 'total_price', 'created_at')

class ProfileSerializer(sz.ModelSerializer):

    class Meta:
        model = get_user_model()
        fields = ['username', 'email',
                  'nickname', 'address', 'detail_address', 'phone'
                  ]

class Review_LaundryShopSerializer(sz.ModelSerializer):

    class Meta:
        model = LaundryShop
        fields = ['name', 'tel']


class ReviewSerializer(sz.ModelSerializer):
    profile = ProfileSerializer()
    laundryshop =Review_LaundryShopSerializer()
    order = OrderSerializer()

    def create(self, validated_data):
        review = Review(
            content=validated_data['content'],
            grade=validated_data['grade'],
            image=validated_data['image']
        )
        review.save()
        return review

    class Meta:
        model = Review
        fields = (
           'parent', 'profile', 'laundryshop', 'order', 'content', 'grade', 'image', 'created_at'
        )


class ParentReviewSerializer(sz.ModelSerializer):
    profile = ProfileSerializer()
    laundryshop =Review_LaundryShopSerializer()
    order = OrderSerializer()
    comment = ReviewSerializer(read_only=True)


    def create(self, validated_data):
        review = Review(
            content=validated_data['content'],
            grade=validated_data['grade'],
            image=validated_data['image']
        )
        review.save()
        return review

    class Meta:
        model = Review
        fields = (
            'profile', 'laundryshop', 'order', 'content', 'grade', 'image', 'created_at', 'comment'
        )




class CommentSerializer(sz.ModelSerializer):
    profile_id = sz.CharField(required=False)
    laundryshop_id = sz.CharField(required=False)
    parent_id = sz.CharField(required=False)

    def create(self, validated_data):
        review = Review(
            content=validated_data['content']
        )
        profile = Profile.objects.get(id=validated_data['FK']['profile_id'])
        laundryshop = LaundryShop.objects.get(
            id=validated_data['FK']['laundry_id'])
        parent = Review.objects.get(id=validated_data['FK']['parent_id'])
        review.profile = profile
        review.laundryshop = laundryshop
        review.parent = parent
        review.save()
        return review

    class Meta:
        model = Review
        fields = (
            'profile_id', 'laundryshop_id','parent_id', 'content'
        )



