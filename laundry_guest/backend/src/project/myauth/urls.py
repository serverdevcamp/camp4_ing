from django.urls import path
from . import views

app_name = 'myauth'

urlpatterns = [
    path('', views.main, name="main"),
    path('sign_up/', views.CreateProfileView.as_view(), name="sign_up"),
    path('login/', views.UserLoginView.as_view(), name="login"),

    path('activate/<str:uuid>/', views.profile_activate, name='profile_activate'),
]
