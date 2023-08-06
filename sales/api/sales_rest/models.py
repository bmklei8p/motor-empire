from django.db import models

class InventoryVO(models.Model):
    vinVO = models.CharField(max_length=100)
    sold = models.BooleanField(default=False)

    def __str__(self):
        return self.vinVO

class Salesman(models.Model):
    name = models.CharField(max_length=100)
    employee_number = models.PositiveIntegerField(unique=True)

    def __str__(self):
        return self.name

class Customer(models.Model):
    name = models.CharField(max_length=100)
    address = models.CharField(max_length=100)
    phone_number = models.CharField(max_length = 20, unique=True)

    def __str__(self):
        return self.name

class Sale(models.Model):
    price = models.CharField(max_length = 20)
    vin = models.ForeignKey(InventoryVO, related_name='vin', on_delete=models.PROTECT)
    customer = models.ForeignKey(Customer, related_name="customer", on_delete=models.PROTECT)
    salesman = models.ForeignKey(Salesman, related_name='salesman', on_delete=models.PROTECT)

    def __str__(self):
        return self.vin
