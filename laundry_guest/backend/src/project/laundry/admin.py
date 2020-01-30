from django.contrib import admin
from .models import LaundryShop, LaundryItem, Like, Review

admin.site.register(LaundryShop)
admin.site.register(LaundryItem)
admin.site.register(Like)
admin.site.register(Review)
