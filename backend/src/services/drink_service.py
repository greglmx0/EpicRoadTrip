from flask import jsonify
import requests
import os

FOURSQUARE_API_URL = os.getenv('FOURSQUARE_API_URL')
FOURSQUARE_API_KEY = os.getenv('FOURSQUARE_API_KEY')

class drink_service:
    def get_drink(latitude, longitude, start_date, end_date, radius=22000):
        try:
            print("drink_service.get_drink")
            print("latitude: ", latitude, "longitude: ", longitude, "start_date: ", start_date, "end_date: ", end_date)
            #  13003 is the category id for Dining and Drinking > Bar
            url = f"{FOURSQUARE_API_URL}/places/search?categories=13003&ll={latitude},{longitude}&start_date={start_date}&end_date={end_date}&radius={radius}"
            print("url: ", url)
            payload={}
            headers = {
                'Authorization': FOURSQUARE_API_KEY
            }
            response = requests.get(url, headers=headers, data=payload)
            if response.status_code == 200:
                return response.json()
            else:
                return {'message': 'An error occurred'}, response.status_code

        except Exception as e:
            print("An error occurred: ", str(e))
            return jsonify({'message': 'Something went wrong'}), 500