from django.db import models

from django.db import models
from myauth.models import Profile
from mylaundry.models import LaundryShop, LaundryItem


class Order(models.Model):
    STATUS_CHOICES = (
        ('ready', '미결제'),
        ('paid', '결제완료'),
        ('cancelled', '결제취소'),
        ('failed', '결제실패'),
        ('waiting', '세탁대기'),
        ('process', '세탁처리'),
        ('finished', '세탁완료'),
    )
    profile = models.ForeignKey(Profile, on_delete=models. DO_NOTHING)
    laundry_shop = models.ForeignKey(LaundryShop, on_delete=models.DO_NOTHING)
    pickup_address = models.CharField(max_length=50, default=False)
    pickup_detail_address = models.CharField(max_length=30, default=False)
    delivery_address = models.CharField(max_length=50, default=False)
    delivery_detail_address = models.CharField(max_length=30, default=False)
    total_price = models.PositiveIntegerField()
    payment_method = models.CharField(max_length=10, default="카드")
    status = models.CharField(
        max_length=9,
        choices=STATUS_CHOICES,
        default='ready',
        db_index=True
    )
    requirement = models.CharField(max_length=50, default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


class OrderItem(models.Model):
    order = models.ForeignKey(Order, related_name='orderitem', on_delete=models.CASCADE)
    laundry_item = models.ForeignKey(LaundryItem, related_name='orderitem', on_delete=models.DO_NOTHING)
    quantity = models.SmallIntegerField(default=0)
    requirement = models.TextField(blank=True)

    def __str__(self):
        return "{}에 대한 {} 주문".format(self.order, self.laundry_item)