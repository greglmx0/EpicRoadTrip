from flask import Blueprint, jsonify, request
from flask_validate_json import validate_json
from src.middlewares.auth_middleware import token_required
from src.services.sleep_service import sleep_service
from flask_parameter_validation import ValidateParameters, Route, Json, Query

sleep_controller = Blueprint("sleep", __name__)

@sleep_controller.route("/sleep", methods=["GET"])
# @token_required  ---- current_user
def get_sleep():
    try:
        print("sleep_controller.get_sleep")
        latitute = request.args.get('latitute')
        longitude = request.args.get('longitude')
        start_date = request.args.get('start_date')
        end_date = request.args.get('end_date')
        # temporary validation -----------------------------------------------------------
        if not latitute or not longitude or not start_date or not end_date:
            return jsonify({'message': 'Missing parameters'}), 400
        # --------------------------------------------------------------------------------
        response = sleep_service.get_sleep(latitute, longitude, start_date, end_date)
        return response

    except Exception as e:
        return jsonify({'message': 'An error occurred', 'error': str(e)}), 500