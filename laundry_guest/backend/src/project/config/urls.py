from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('myauth/', include('myauth.urls')),
    path('laundry/', include('laundry.urls')),
    path('payment/', include('payment.urls')),
    path('api-auth/', include('rest_framework.urls')),
]
