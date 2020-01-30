from django.db import models
from myauth.models import Profile


class LaundryShop(models.Model):
    profile = models.OneToOneField(Profile, on_delete=models.CASCADE)
    name = models.CharField(max_length=30)
    tel = models.CharField(max_length=11)
    information = models.TextField()
    start_time = models.TimeField()
    end_time = models.TimeField()
    min_price = models.IntegerField()
    grade = models.CharField(max_length=10)
    delivery_time = models.TimeField()
