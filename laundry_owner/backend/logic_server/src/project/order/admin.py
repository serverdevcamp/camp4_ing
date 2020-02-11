from django.contrib import admin
from .models import Order, OrderItem

admin.site.register(Order)



class OrderItemAdmin(admin.ModelAdmin):
    list_display = ('order', 'laundry_item', 'quantity')

admin.site.register(OrderItem, OrderItemAdmin)
