from django.contrib import admin
from .models import LaundryShop, LaundryItem, Like, Review

admin.site.register(LaundryShop)
admin.site.register(Like)
admin.site.register(Review)


class LaundryItemAdmin(admin.ModelAdmin):
    list_display = ('category', 'material', 'price', 'laundry_shop')


admin.site.register(LaundryItem, LaundryItemAdmin)
