from django.urls import path
from . import views

app_name = "payment"

urlpatterns = [
    path('<int:laundry_id>/order/', views.OrderView.as_view(), name="order"),
    path('<int:laundry_id>/order/<int:order_id>/',
         views.OrderView.as_view(), name="order_detail"),
]
