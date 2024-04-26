from flask import Blueprint
from src.middlewares.auth_middleware import token_required
from src.services.user_service import user_service


user_controller = Blueprint("user", __name__)
@user_controller.route("/register", methods=["POST"])
def create_user():
    print("user_controller.create_user")
    return user_service.create_user()

@user_controller.route("/login", methods=["POST"])
def login_user():
    print("user_controller.login_user")
    return user_service.login_user()

@user_controller.route("/users", methods=["GET"])
@token_required
def get_users(current_user):
    print("user_controller.get_users")
    return user_service.get_users()

