from rest_framework import serializers as sz
from .models import LaundryShop, LaundryItem, Like, Review


class LaundryShopSerializer(sz.ModelSerializer):
    class Meta:
        model = LaundryShop
#        fields = '__all__'
        fields = [
            'name', 'tel', 'information', 'operating_time', 'min_price', 'grade', 'delivery_dt'
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
            'name', 'tel', 'information', 'operating_time', 'min_price', 'grade', 'delivery_dt', 'laundry_item'
        )


class ReviewSerializer(sz.ModelSerializer):
    profile_id = sz.CharField(read_only=True)
    laundryshop_id = sz.CharField(read_only=True)

    def create(self, validated_data):
        review = Review(
            content=validated_data['content'],
            grade=validated_data['grade'],
            image=validated_data['image']
        )

    class Meta:
        model = Review
        fields = (
            'profile_id', 'laundryshop_id', 'content', 'grade', 'image'
        )
