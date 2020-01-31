from django.urls import path
from . import views

app_name = 'laundry'

urlpatterns = [
    path('', views.LaundryShopView.as_view(), name="main"),
    path('<int:id>/', views.LaundryShopDetailView.as_view(),
         name="laundry_shop_detail"),
]
