from flask import jsonify
import requests
import os

FOURSQUARE_API_URL = os.getenv('FOURSQUARE_API_URL')
FOURSQUARE_API_KEY = os.getenv('FOURSQUARE_API_KEY')

class eat_service:
    def get_eat(latitute, longitude, start_date, end_date, radius=22000):
        try:
            print("eat_service.get_eat")
            print("latitute: ", latitute, "longitude: ", longitude, "start_date: ", start_date, "end_date: ", end_date, "radius: ", radius)
            # 13065 is the category id for Dining and Drinking > Restaurant
            url = f"{FOURSQUARE_API_URL}/places/search?categories=13065&ll={latitute},{longitude}&start_date={start_date}&end_date={end_date}&radius={radius}"
            print("url: ", url)
            payload={}
            headers = {
                'Authorization': FOURSQUARE_API_KEY
            }
            response = requests.get(url, headers=headers, data=payload)
            if response.status_code == 200:
                return response.text
            else:
                return {'message': 'An error occurred'}, response.status_code
        except Exception as e:
            return jsonify({'message': 'An error occurred', 'error': str(e)}), 500