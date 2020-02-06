from django.db import models
from myauth.models import Profile
from django_mysql import models as mysql_models


class LaundryShop(models.Model):
    STATUS_CHOICES = (
        ('0', '휴점'),
        ('1', '개점'),
        ('9', '탈퇴')
    )
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
    status = models.CharField(max_length=2, choices=STATUS_CHOICES)

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

    def __str__(self):
        return "'{}'의 '{}'에 대한 좋아요".format(self.profile.nickname, self.laundryshop.name)


class Review(models.Model):
    profile = models.ForeignKey(Profile, on_delete=models.CASCADE)
    order = models.OneToOneField(
        "payment.Order", null=True, blank=True, on_delete=models.CASCADE)
    laundryshop = models.ForeignKey(LaundryShop, on_delete=models.CASCADE)
    parent = models.OneToOneField(
        'self', null=True, blank=True, related_name='comment', on_delete=models.CASCADE)
    content = models.TextField()
    grade = models.SmallIntegerField(null=True, blank=True)
    image = mysql_models.JSONField(null=True, blank=True)
    """
    {
        "imageUrls": ["이미지주소1", "이미지주소2", ... ]
    }
    """
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-id']

    def __str__(self):
        return self.content[:10]
