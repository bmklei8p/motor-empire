from django.urls import path
from .api_views import api_list_salesmen, api_list_customers, api_list_sales, api_InventoryVO, api_detail_InventoryVO

urlpatterns = [
    path('salesmen/', api_list_salesmen, name='api_list_salesmen'),
    path('customers/', api_list_customers, name='api_list_customers'),
    path("salesmen/<int:pk>/",api_list_salesmen, name="api_create_salesman"),
    path("customers/<int:pk>/",api_list_customers, name="api_create_customer"),
    path("sales/",api_list_sales, name="api_list_sales"),
    path("sales/<int:pk>/",api_list_sales, name="api_create_sale"),
    path("inventory/", api_InventoryVO, name="api_InventoryVO"),
    path("inventory/<str:vinVO>/", api_detail_InventoryVO, name="api_detail_InventoryVO")]
