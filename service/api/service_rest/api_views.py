from django.views.decorators.http import require_http_methods
from django.http import JsonResponse
from common.json import ModelEncoder
import json
from .models import InvVO, Technician, ServiceAppointment


class InvVOEncoder(ModelEncoder):
    model = InvVO
    properties = [
        "VINVO", "VIP",
    ]

class TechnicianEncoder(ModelEncoder):
    model = Technician
    properties = [
        "name", "employee_number",
    ]

class ServiceAppointmentEncoder(ModelEncoder):
    model = ServiceAppointment
    properties = [
        "id", "date", "service_reason", "owner", "completed",
        "VIN", "technician",
    ]
    encoders = {
        "VIN": InvVOEncoder(),
        "technician": TechnicianEncoder()
    }


@require_http_methods(["GET", "POST"])
def api_list_service_appointments(request):
    if request.method == "GET":
        appointments = ServiceAppointment.objects.all()
        return JsonResponse({"appointments": appointments}, encoder=ServiceAppointmentEncoder, safe=False)
    else:
        content = json.loads(request.body)

        try:
            vinvo = content["VIN"]
            vin = InvVO.objects.get(VINVO=vinvo)
            content["VIN"] = vin
        except InvVO.DoesNotExist:
            vin = InvVO.objects.create(VINVO=content["VIN"])
            content["VIN"] = vin

        try:
            employee_number = content["technician"]
            technician = Technician.objects.get(employee_number=employee_number)
            content["technician"] = technician
        except Technician.DoesNotExist:
            return JsonResponse({"Message": "Invalid employee ID"})

        appointment = ServiceAppointment.objects.create(**content)
        return JsonResponse(appointment, encoder=ServiceAppointmentEncoder, safe=False)




@require_http_methods(["GET", "DELETE", "PUT"])
def api_detail_service_appointment(request, pk):
    if request.method == "GET":
        service = ServiceAppointment.objects.filter(id=pk)
        return JsonResponse({"appointment": service}, encoder=ServiceAppointmentEncoder, safe=False)
    elif request.method == "DELETE":
        count, _ = ServiceAppointment.objects.filter(id=pk).delete()
        return JsonResponse({"deleted": count > 0})
    else:
        content = json.loads(request.body)

        ServiceAppointment.objects.filter(id=pk).update(**content)
        appointment = ServiceAppointment.objects.get(id=pk)
        return JsonResponse({"appointment": appointment}, encoder=ServiceAppointmentEncoder, safe=False)


@require_http_methods(["GET", "POST"])
def api_list_techs(request):
    if request.method == "GET":
        technicians = Technician.objects.all()
        return JsonResponse({"technicians": technicians}, encoder=TechnicianEncoder, safe=False)
    else:
        content = json.loads(request.body)
        technician = Technician.objects.create(**content)
        return JsonResponse(technician, encoder=TechnicianEncoder, safe=False)


@require_http_methods(["DELETE"])
def api_detail_techs(request, num):
    count, _ = Technician.objects.filter(employee_number=num).delete()
    return JsonResponse({"Deleted": count > 0})