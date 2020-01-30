from django.conf import settings
from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin


class Profile(models.Model):
    user = models.OneToOneField(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    nickname = models.CharField(max_length=20)
    address = models.CharField(max_length=100)
    phone = models.CharField(max_length=11)
    business_num = models.CharField(max_length=10)

    def __str__(self):
        return self.nickname


class UserManager(BaseUserManager):

    use_in_migrations = True

    def create_user(self, email, username, password=None):

        if not email:
            raise ValueError('must have user email')
        user = self.model(
            email=self.normalize_email(email),
            username=username
        )
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, username, password):

        user = self.create_user(
            email=self.normalize_email(email),
            username=username,
            password=password
        )
        user.is_admin = True
        user.is_superuser = True
        user.is_staff = True
        user.save(using=self._db)
        return user


# class MyUser(AbstractBaseUser, PermissionsMixin):

#     objects = UserManager()

#     STATUS_CHOICES = (
#         ('0', '가입대기'),
#         ('1', '가입활성화'),
#         ('8', '블랙리스트'),
#         ('9', '탈퇴')
#     )
#     ROLE_CHOICES = (
#         ('0', '일반 유저'),
#         ('5', '세탁소 사장'),
#         ('10', '관리자')
#     )
#     username = models.CharField(
#         max_length=16,
#         unique=True
#     )
#     email = models.EmailField(
#         max_length=50,
#     )
#     nickname = models.CharField(
#         max_length=10,
#         unique=True
#     )
#     address = models.CharField(max_length=50)
#     detail_address = models.CharField(max_length=30)
#     phone = models.CharField(max_length=11)
#     created_at = models.DateTimeField(auto_now_add=True)
#     updated_at = models.DateTimeField(auto_now=True)
#     last_login = models.DateTimeField(blank=True)
#     status = models.CharField(max_length=2, choices=STATUS_CHOICES)
#     role = models.CharField(max_length=2, choices=ROLE_CHOICES)
#     business_num = models.CharField(max_length=10, unique=True)

#     is_active = models.BooleanField(default=True)
#     is_admin = models.BooleanField(default=False)
#     is_superuser = models.BooleanField(default=False)
#     is_staff = models.BooleanField(default=False)
#     date_joined = models.DateTimeField(auto_now_add=True)
#     USERNAME_FIELD = 'username'
#     REQUIRED_FIELDS = ['email']
