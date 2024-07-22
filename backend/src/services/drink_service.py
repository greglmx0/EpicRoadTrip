from flask import jsonify
import requests
import os

FOURSQUARE_API_URL = os.getenv('FOURSQUARE_API_URL')
FOURSQUARE_API_KEY = os.getenv('FOURSQUARE_API_KEY')

class drink_service:
    def get_drink(latitute, longitude, start_date, end_date):
        try:
            print("drink_service.get_drink")
            print("latitute: ", latitute, "longitude: ", longitude, "start_date: ", start_date, "end_date: ", end_date)
            #  13003 is the category id for Dining and Drinking > Bar
            url = f"{FOURSQUARE_API_URL}/places/search?categories=13003&ll={latitute},{longitude}&start_date={start_date}&end_date={end_date}"
            print("url: ", url)
            payload={}
            headers = {
                'Authorization': FOURSQUARE_API_KEY
            }
            response = requests.get(url, headers=headers, data=payload)
            # print(response.text)
            return response.text

        except Exception as e:
            return jsonify({'message': 'An error occurred', 'error': str(e)}), 500