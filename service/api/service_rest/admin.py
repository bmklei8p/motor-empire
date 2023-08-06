from django.contrib import admin
from .models import InvVO, Technician, ServiceAppointment


admin.site.register(InvVO)
admin.site.register(Technician)
admin.site.register(ServiceAppointment)