from django.db import models

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
    total_price = models.PositiveIntegerField(default=0)
    payment_method = models.CharField(max_length=10, default="카드")
    status = models.CharField(
        max_length=9,
        choices=STATUS_CHOICES,
        default='ready',
        db_index=True
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return "{}의 {}에 대한 order".format(self.profile, self.laundry_shop)


class OrderItem(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE)
    laundry_item = models.ForeignKey(LaundryItem, on_delete=models.DO_NOTHING)
    quantity = models.SmallIntegerField(default=0)

    def __str__(self):
        return "{}에 대한 {} 주문".format(self.order, self.laundry_item)
