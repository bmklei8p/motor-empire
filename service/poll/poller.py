import django
import os
import sys
import time
import json
import requests

sys.path.append("")
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "service_project.settings")
django.setup()

# Import models from service_rest, here.
from service_rest.models import InvVO

def poll():
    while True:
        print('Service poller polling for data')
        try:
            response = requests.get("http://inventory-api:8000/api/automobiles/")
            content = json.loads(response.content)
            for car in content["autos"]:
                InvVO.objects.update_or_create(VINVO=car["vin"], defaults={"VIP": True})
        except Exception as e:
            print(e, file=sys.stderr)
        time.sleep(60)


if __name__ == "__main__":
    poll()


## the poller can update the vip status
