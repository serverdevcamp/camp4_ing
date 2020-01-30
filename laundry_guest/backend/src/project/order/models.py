from django.db import models
from myauth.models import Profile
from laundry.models import LaundryShop, LaundryItem


class Order(models.Model):
    STATUS_CHOICES = (
        ('ready', '미결제'),
        ('paid', '결제완료'),
        ('cancelled', '결제취소'),
        ('failed', '결제실패'),
    )
    profile = models.ForeignKey(Profile, on_delete=models. DO_NOTHING)
    laundry_shop = models.ForeignKey(LaundryShop, on_delete=models.DO_NOTHING)
    total_price = models.PositiveIntegerField()
    payment_method = models.CharField(max_length=10, default="카드")
    status = models.CharField(
        max_length=9,
        choices=STATUS_CHOICES,
        default='ready',
        db_index=True
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


class OrderItem(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE)
    laundry_item = models.ForeignKey(LaundryItem, on_delete=models.DO_NOTHING)
    quantity = models.SmallIntegerField(default=0)
