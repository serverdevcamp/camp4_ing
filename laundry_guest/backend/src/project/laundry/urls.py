from django.urls import path
from . import views

app_name = 'laundry'

urlpatterns = [
    path('', views.LaundryShopView.as_view(), name="main"),
    path('<int:id>/', views.LaundryShopDetailView.as_view(),
         name="laundry_shop_detail"),
    path('<int:id>/like/', views.LaundryShopLikeView.as_view(),
         name="laundryshop_like"),
    path('<int:id>/review/', views.ReviewView.as_view(), name="review"),
    path('<int:id>/review/<int:review_id>/',
         views.ReviewDetailView.as_view(), name="review_detail"),
    path('order/<str:is_reviewd>/', views.OrderForReviewView.as_view(),
         name="order_for_review"),
    path('order_detail/<int:order_id>/', views.OrderForReviewDetailView.as_view(),
         name="order_for_review_detail"),
    # path('review/<str:is_reviewd>/',
    #   views.profile_view, name = "profile_review"),
]
