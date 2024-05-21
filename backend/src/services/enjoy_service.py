
from flask import jsonify
import requests
import os

PREDICTHQ_ACCESS_TOKEN = os.environ.get('PREDICTHQ_ACCESS_TOKEN')
PREDICTHQ_API_URL = os.environ.get('PREDICTHQ_API_URL') or 'no credentials found'


class enjoy_service:
    def get_enjoy(latitute, longitude, start_date, end_date):
        try:
            print("enjoy_service.get_enjoy")
            print("latitute: ", latitute, "longitude: ", longitude, "start_date: ", start_date, "end_date: ", end_date)
            url = f"{PREDICTHQ_API_URL}/events?location_around.origin={latitute},{longitude}&end.gte={start_date}&end.lte={end_date}"
            print("url: ", url)
            payload={}
            headers = {
                'Authorization': f'Bearer {PREDICTHQ_ACCESS_TOKEN}'
            }
            response = requests.get(url, headers=headers, data=payload)
            # print(response.text)
            return response.text

        except Exception as e:
            return jsonify({'message': 'An error occurred', 'error': str(e)}), 500

# import requests
# url = "https://api.predicthq.com/v1/events?location_around.origin=48.1173,-1.6778&end.gte=2024-05-01&end.lte=2024-05-02"
# payload={}
# headers = {
#   'Authorization': 'Bearer FCwEWQJizazDyimtOXw6bKah3aMMs38PiKS0CqqE'
# }
# response = requests.request("GET", url, headers=headers, data=payload)
# print(response.text)