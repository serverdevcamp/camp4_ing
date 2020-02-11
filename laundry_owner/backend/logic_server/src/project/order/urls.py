from django.urls import path
from . import views

app_name = 'order'

urlpatterns = [
    path('<int:shop_id>', views.OrderView.as_view(), name="main"),
    path('<int:shop_id>/waiting', views.OrderView_waitng.as_view(), name="waiting_order_list"),
    path('<int:shop_id>/processing', views.OrderView_processing.as_view(), name="processing_order_list"),
    path('<int:shop_id>/finished', views.OrderView_finished.as_view(), name="finished_order_list"),

    path('<int:shop_id>/<int:order_id>/', views.OrderDetailView.as_view(),
         name="order_detail")
]
