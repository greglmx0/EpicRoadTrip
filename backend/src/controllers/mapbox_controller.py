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