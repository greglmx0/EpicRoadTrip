
from flask import jsonify
import requests
import os

TICKETMASTER_API_URL= os.getenv('TICKETMASTER_API_URL')
TICKETMASTER_ACCESS_TOKEN= os.getenv('TICKETMASTER_ACCESS_TOKEN')

class enjoy_service:
    def get_enjoy(latitute, longitude, start_date, end_date):
        try:
            print("enjoy_service.get_enjoy")
            print("latitute: ", latitute, "longitude: ", longitude, "start_date: ", start_date, "end_date: ", end_date)
            # url = f"{TICKETMASTER_API_URL}/events?apikey={TICKETMASTER_ACCESS_TOKEN}&latlong={latitute},{longitude}&locale=*&sort=distance,asc"
            url = f"{TICKETMASTER_API_URL}/events?apikey={TICKETMASTER_ACCESS_TOKEN}&latlong={latitute},{longitude}&locale=*&sort=distance,date,asc"
            print("url: ", url)
            payload={}
            headers = {}
            response = requests.get(url, headers=headers, data=payload)
            # print(response.text)
            return response.text

        except Exception as e:
            return jsonify({'message': 'An error occurred', 'error': str(e)}), 500