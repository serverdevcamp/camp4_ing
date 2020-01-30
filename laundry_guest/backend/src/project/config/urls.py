from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('myauth/', include('myauth.urls')),
    path('laundry/', include('laundry.urls')),
]
