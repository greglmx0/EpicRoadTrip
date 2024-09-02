from flask import jsonify
import requests
import os

FOURSQUARE_API_URL = os.getenv('FOURSQUARE_API_URL')
FOURSQUARE_API_KEY = os.getenv('FOURSQUARE_API_KEY')

class sleep_service:
    def get_sleep(latitute, longitude, start_date, end_date):
        try:
            print("sleep_service.get_sleep")
            print("latitute: ", latitute, "longitude: ", longitude, "start_date: ", start_date, "end_date: ", end_date)
            #  13003 is the category id for Dining and Drinking > Bar
            category_id = 19009 # Travel and Transportation > Lodging
            url = f"{FOURSQUARE_API_URL}/places/search?categories={category_id}&ll={latitute},{longitude}&start_date={start_date}&end_date={end_date}"
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