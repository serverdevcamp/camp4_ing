from django.contrib import admin
from .models import LaundryShop, LaundryItem, Like, Review

admin.site.register(LaundryShop)
admin.site.register(Like)


class LaundryItemAdmin(admin.ModelAdmin):
    list_display = ('category', 'material', 'price', 'laundry_shop')


admin.site.register(LaundryItem, LaundryItemAdmin)


class reviewAdmin(admin.ModelAdmin):
    list_display = ('profile', 'order', 'laundryshop', 'parent', 'content')


admin.site.register(Review, reviewAdmin)
