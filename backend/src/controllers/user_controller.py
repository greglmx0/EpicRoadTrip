from flask import Blueprint, abort
from flask_validate_json import validate_json
from src.middlewares.auth_middleware import token_required
from src.services.user_service import user_service
from src.validators.user_validator import create_user_schema, login_user_schema
from flask import jsonify

user_controller = Blueprint("user", __name__)


def return_error(e, status_code):
    e = str(e).split("\n")
    e = e[0]
    return jsonify({"message": e}), status_code


@user_controller.route("/register", methods=["POST"])
@validate_json(create_user_schema, resp_func=lambda e: return_error(e, 400))
def create_user():
    print("user_controller.create_user")
    return user_service.create_user()


@user_controller.route("/login", methods=["POST"])
@validate_json(login_user_schema, resp_func=lambda e: return_error(e, 400))
def login_user():
    print("user_controller.login_user")
    return_json = user_service.login_user()
    print("return_json", return_json)
    return return_json


@user_controller.route("/users", methods=["GET"])
@token_required
def get_users(current_user):
    print("user_controller.get_users")
    return user_service.get_users()


@user_controller.route("/auth/google", methods=["POST"])
def aouth2_google():
    print("user_controller aouth2_google")
    return_json = user_service.aouth2_google()
    print("return_json", return_json)
    return return_json


@user_controller.route("/logout", methods=["POST"])
def logout_user():
    print("user_controller.logout_user")
    return user_service.logout_user()


@user_controller.route("/user/info", methods=["GET"])
@token_required
def get_user_info(current_user):
    print("user_controller.get_users")
    return user_service.get_user_info(current_user)
