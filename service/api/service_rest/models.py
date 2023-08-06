from django.db import models


class InvVO(models.Model):
    VINVO = models.CharField(max_length=17)
    VIP = models.BooleanField(default=False)

    def __str__(self):
        return self.VINVO


class Technician(models.Model):
    name = models.CharField(max_length=50)
    employee_number = models.SmallIntegerField(unique=True)

    def __str__(self):
        return self.name

class ServiceAppointment(models.Model):
    technician = models.ForeignKey(Technician, related_name="technician", on_delete=models.PROTECT)
    date = models.DateTimeField()
    service_reason = models.CharField(max_length=100)
    owner = models.CharField(max_length=50)
    completed = models.BooleanField(default=False)
    VIN = models.ForeignKey(InvVO, related_name="VIN", on_delete=models.PROTECT)
