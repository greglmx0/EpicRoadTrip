from flask import jsonify
import requests
import os

MAPBOX_ACCESS_TOKEN = os.environ.get('MAPBOX_ACCESS_TOKEN') or 'no access token found'
MPABOX_API_URL = os.environ.get('MPABOX_API_URL') or 'no api url found'
SESSION_TOKEN = os.environ.get('SESSION_TOKEN') or '1234567890'

class mapbox_service:
    def get_suggest(query):
        try:
            print("mapbox_service.get_suggest")
            print("query: ", query)
            # url exemple https://api.mapbox.com/search/searchbox/v1/suggest?q={search_text}&access_token={access_token}
            url = f"{MPABOX_API_URL}/search/searchbox/v1/suggest?q={query}&access_token={MAPBOX_ACCESS_TOKEN}&session_token={SESSION_TOKEN}"
            # print("url: ", url)
            payload={}
            headers = {}
            response = requests.get(url, headers=headers, data=payload)
            return response.json()['suggestions']
        except Exception as e:
            return jsonify({'message': 'An error occurred', 'error': str(e)}), 500

    def get_retrieve(mapbox_id):
        try:
            print("mapbox_service.retrieve")
            print("mapbox_id: ", mapbox_id)
            url = f"{MPABOX_API_URL}/search/searchbox/v1/retrieve/{mapbox_id}?access_token={MAPBOX_ACCESS_TOKEN}&session_token={SESSION_TOKEN}"
            # print("url: ", url)
            payload={}
            headers = {}
            response = requests.get(url, headers=headers, data=payload)
            return response.json()['features']
        except Exception as e:
            return jsonify({'message': 'An error occurred', 'error': str(e)}), 500

    def get_trip(depart_lat, depart_lon, arrive_lat, arrive_lon, routing):
        try:
            print(f'mapbox_service.get_trip  depart: {depart_lat}, {depart_lon} arrive: {arrive_lat}, {arrive_lon} type {routing}')
            # https://api.mapbox.com/directions/v5/mapbox/driving/-1.681558,48.113247;2.348392,48.853495?alternatives=true&geometries=geojson&language=fr&overview=full&steps=true&access_token=
            url = f"{MPABOX_API_URL}/directions/v5/mapbox/{routing}/{depart_lat},{depart_lon};{arrive_lat},{arrive_lon}?alternatives=true&geometries=geojson&language=fr&overview=full&steps=true&access_token={MAPBOX_ACCESS_TOKEN}&unit=km"
            # print("url: ", url)
            payload={}
            headers = {}
            response = requests.get(url, headers=headers, data=payload)
            if response.status_code == 200:
                return response.json()
            else:
                return jsonify({'message': 'An error occurred', 'error': response.text}), 500
        except Exception as e:
            return jsonify({'message': 'An error occurred', 'error': str(e)}), 500