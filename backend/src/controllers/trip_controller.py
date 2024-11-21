from flask import Blueprint, abort
from flask_validate_json import validate_json
from src.middlewares.auth_middleware import token_required
from src.services.trip_service import trip_service
from src.validators.trip_validator import create_trip_schema
from flask import jsonify

trip_controller = Blueprint("trip", __name__)

def return_error(e, status_code):
    # e = str(e).split("\n")
    # e = e[0]
    e = str(e)
    return jsonify({"message": e}), status_code

@trip_controller.route("/trip", methods=["POST"])
@validate_json(create_trip_schema, resp_func=lambda e: return_error(e, 400))
@token_required
def create_trip(current_user):
    print("trip_controller.create_trip", current_user)
    return trip_service.create_trip(current_user)

@trip_controller.route("/trip", methods=["GET"])
@token_required
def get_trips_by_user_id(current_user):
    return trip_service.get_trips_by_user_id(current_user.get("id"))

@trip_controller.route("/trip/<id>", methods=["GET"])
def get_trip_by_id(id):
    return trip_service.get_trip_by_id(id)