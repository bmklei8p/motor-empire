from .models import InventoryVO, Salesman, Customer, Sale
from common.json import ModelEncoder
from django.views.decorators.http import require_http_methods
from django.http import JsonResponse
import json

class InventoryVOEncoder(ModelEncoder):
    model = InventoryVO
    properties = ['id', 'vinVO', 'sold']

class SalesmanListEncoder(ModelEncoder):
    model = Salesman
    properties = ['id','name', 'employee_number']

class CustomerListEncoder(ModelEncoder):
    model = Customer
    properties = ['id', 'name', 'address', 'phone_number']

class SaleListEncoder(ModelEncoder):
    model = Sale
    properties = ['id', 'price', 'vin', 'customer', 'salesman']
    encoders = {
        'vin': InventoryVOEncoder(),
        'customer': CustomerListEncoder(),
        'salesman': SalesmanListEncoder(),
    }

@require_http_methods(["GET", "POST"])
def api_list_salesmen(request):
    if request.method == "GET":
        salesmen = Salesman.objects.all()
        return JsonResponse({"salesmen": salesmen},encoder=SalesmanListEncoder)
    else:
        try:
            content = json.loads(request.body)
            salesman = Salesman.objects.create(**content)
            return JsonResponse(
                salesman,
                encoder=SalesmanListEncoder,
                safe=False,
            )
        except:
            response = JsonResponse(
                {"message": "Could not create the salesman"}
            )
            response.status_code = 400
            return response

@require_http_methods(["GET", "POST"])
def api_list_customers(request):
    if request.method == "GET":
        customers = Customer.objects.all()
        return JsonResponse({"customers": customers},encoder=CustomerListEncoder)
    else:
        try:
            content = json.loads(request.body)
            customer = Customer.objects.create(**content)
            return JsonResponse(
                customer,
                encoder=CustomerListEncoder,
                safe=False,
            )
        except:
            response = JsonResponse(
                {"message": "Could not create the salesman"}
            )
            response.status_code = 400
            return response

@require_http_methods(["GET", "POST"])
def api_list_sales(request):
    if request.method == "GET":
        sales = Sale.objects.all()
        return JsonResponse({"sales": sales}, encoder=SaleListEncoder)
    else:

        content = json.loads(request.body)
        try:
            vin_number = content["vin"]
            vin = InventoryVO.objects.get(vinVO=vin_number)
            content['vin']=vin
        except InventoryVO.DoesNotExist:
            return JsonResponse({"message": "Incorrect VIN"}, status=400,)

        try:
            customer_name = content["customer"]
            customer = Customer.objects.get(name=customer_name)
            content['customer']=customer
        except Customer.DoesNotExist:
            return JsonResponse({"message": "Incorrect Customer"}, status=400,)

        try:
            salesman_name = content["salesman"]
            salesman = Salesman.objects.get(name=salesman_name)
            content['salesman']=salesman
        except Salesman.DoesNotExist:
            return JsonResponse({"message": "Incorrect Salesman"}, status=400,)

    sale = Sale.objects.create(**content)
    return JsonResponse(
        sale,
         encoder=SaleListEncoder,
         safe=False,
    )

@require_http_methods(["GET"])
def api_InventoryVO(request):
    if request.method == 'GET':
        inventories = InventoryVO.objects.all()
        return JsonResponse({'inventories': inventories}, encoder=InventoryVOEncoder)

@require_http_methods(["PUT"])
def api_detail_InventoryVO(request, vinVO):
    content = json.loads(request.body)
    InventoryVO.objects.filter(vinVO=vinVO).update(**content)
    inventory = InventoryVO.objects.get(vinVO=vinVO)
    return JsonResponse({'inventory': inventory}, encoder=InventoryVOEncoder)
