from flask import Blueprint
from flask import request
import os

from src.services.mapbox_service import mapbox_service

mapbox_controller = Blueprint('mapbox_controller', __name__)

@mapbox_controller.route('/mapbox/suggest', methods=['GET'])
def suggest():
    # query example: "london"
    return mapbox_service.get_suggest(request.args.get('query'))

@mapbox_controller.route('/mapbox/retrieve', methods=['GET'])
def retrieve():
    return mapbox_service.get_retrieve(request.args.get('mapbox_id'))

@mapbox_controller.route('/mapbox/trip', methods=['GET'])
def trip():
    depart_lat = request.args.get('depart_lat')
    depart_lon = request.args.get('depart_lon')
    arrive_lat = request.args.get('arrive_lat')
    arrive_lon = request.args.get('arrive_lon')
    routing = request.args.get('routing')
    # print(f'mapbox_controller.trip  depart: {depart_lat}, {depart_lon} arrive: {arrive_lat}, {arrive_lon} type {routing}')
    return mapbox_service.get_trip(depart_lat, depart_lon, arrive_lat, arrive_lon, routing)