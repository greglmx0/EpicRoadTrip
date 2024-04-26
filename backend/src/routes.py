from flask import Blueprint
from src.controllers.user_controller import user_controller

routes = Blueprint("routes", __name__)
@routes.route("/")
def hello_world():
    return {"hello": "world"}

routes.register_blueprint(user_controller)


