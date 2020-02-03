from django.contrib import admin
from django.urls import path, include
from rest_framework_jwt.views import obtain_jwt_token, verify_jwt_token, refresh_jwt_token

urlpatterns = [
    path('admin/', admin.site.urls),
    path('myauth/', include('myauth.urls')),
    path('laundry/', include('laundry.urls')),
    path('payment/', include('payment.urls')),
    path('jwt/get/', obtain_jwt_token),
    path('jwt/verify/', verify_jwt_token),
    path('jwt/refresh/', refresh_jwt_token),
    path('api-auth/', include('rest_framework.urls')),
]
