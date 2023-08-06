import django
import os
import sys
import time
import json
import requests

sys.path.append("")
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "sales_project.settings")
django.setup()

from sales_rest.models import InventoryVO

def poll():
    while True:
        print('Sales poller polling for data')
        try:
            response = requests.get("http://inventory-api:8000/api/automobiles/")
            content = json.loads(response.content)
            for car in content["autos"]:
                InventoryVO.objects.update_or_create(vinVO=car["vin"])
        except Exception as e:
            print(e, file=sys.stderr)
        time.sleep(60)


if __name__ == "__main__":
    poll()
