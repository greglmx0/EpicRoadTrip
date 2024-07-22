from flask import Blueprint, jsonify, request
from flask_validate_json import validate_json
from src.middlewares.auth_middleware import token_required
from src.services.drink_service import drink_service
from flask_parameter_validation import ValidateParameters, Route, Json, Query

drink_controller = Blueprint("drink", __name__)

@drink_controller.route("/drink", methods=["GET"])
# @token_required  ---- current_user

def get_drink():
    try:
        print("drink_controller.get_drink")
        latitute = request.args.get('latitute')
        longitude = request.args.get('longitude')
        start_date = request.args.get('start_date')
        end_date = request.args.get('end_date')
        # temporary validation -----------------------------------------------------------
        if not latitute or not longitude or not start_date or not end_date:
            return jsonify({'message': 'Missing parameters'}), 400
        # --------------------------------------------------------------------------------
        response = drink_service.get_drink(latitute, longitude, start_date, end_date)
        return response

    except Exception as e:
        return jsonify({'message': 'An error occurred', 'error': str(e)}), 500