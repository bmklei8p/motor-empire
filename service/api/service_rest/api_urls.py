from django.urls import path
from .api_views import api_list_techs, api_list_service_appointments, api_detail_service_appointment, api_detail_techs

urlpatterns = [
    path('technicians/', api_list_techs, name="api_list_techs"),
    path('appointments/', api_list_service_appointments, name="api_list_appointments"),
    path('appointments/<int:pk>/', api_detail_service_appointment, name="appointments_history"),
    path('appointments/<int:pk>/', api_detail_service_appointment, name="delete_appointment"),
    path('technicians/<int:num>/', api_detail_techs, name="delete_technicians"),
]
