from flask import Blueprint
from src.controllers.user_controller import user_controller
from src.controllers.enjoy_controller import enjoy_controller
from src.controllers.mapbox_controller import mapbox_controller

routes = Blueprint("routes", __name__)
@routes.route("/")
def hello_world():
    return {"hello": "world"}

routes.register_blueprint(user_controller)
routes.register_blueprint(enjoy_controller)
routes.register_blueprint(mapbox_controller)
