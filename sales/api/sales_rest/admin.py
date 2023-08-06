from django.contrib import admin
from .models import Salesman, Customer, Sale, InventoryVO

# Register your models here.
admin.site.register(Salesman)
admin.site.register(Customer)
admin.site.register(Sale)
admin.site.register(InventoryVO)
