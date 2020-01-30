from django.urls import path
from . import views

app_name = 'laundry'

urlpatterns = [
    path('', views.LaundryShopView.as_view(), name="main"),
]
