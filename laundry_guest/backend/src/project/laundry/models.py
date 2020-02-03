from django.db import models
from myauth.models import Profile
from django_mysql import models as mysql_models


class LaundryShop(models.Model):
    profile = models.OneToOneField(Profile, on_delete=models.CASCADE)
    name = models.CharField(max_length=30)
    tel = models.CharField(max_length=11)
    information = models.TextField()
    operating_time = mysql_models.JSONField()
    """
    {
        {
            "days": ["월", "화", "수"],
            "start_time": "09:30",
            "end_time": "20:30"
        },
        {
            "days": ["주말"],
            "start_time": "10:30",
            "end_time": "18:30"
        }
    }
    """
    min_price = models.PositiveIntegerField()
    grade = models.DecimalField(max_digits=2, decimal_places=1, default=0)
    delivery_dt = models.CharField(max_length=20)
    like_num = models.PositiveIntegerField(default=0)

    def __str__(self):
        return self.name


class LaundryItem(models.Model):
    laundry_shop = models.ForeignKey(
        LaundryShop, on_delete=models.CASCADE, related_name='laundry_item')
    category = models.CharField(max_length=10)
    material = models.CharField(max_length=10)
    price = models.PositiveIntegerField()

    def __str__(self):
        return self.category


class Like(models.Model):
    profile = models.OneToOneField(Profile, on_delete=models.CASCADE)
    laundryshop = models.OneToOneField(LaundryShop, on_delete=models.CASCADE)


class Review(models.Model):
    profile = models.ForeignKey(Profile, on_delete=models.CASCADE)
    laundryshop = models.ForeignKey(LaundryShop, on_delete=models.CASCADE)
    content = models.TextField()
    grade = models.SmallIntegerField()
    image = mysql_models.JSONField()
    """
    {
        "imageUrls": ["이미지주소1", "이미지주소2", ... ]
    }
    """
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.content[:10]
