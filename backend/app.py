from flask import Flask, jsonify, request
from flask_cors import CORS, cross_origin
from src.config.database import db, migrate
from src.routes import routes
from flask_swagger_ui import get_swaggerui_blueprint

import os

SECRET_KEY = os.environ.get('SECRET_KEY') or 'no secret key found'
MYSQL_DATABASE = os.environ.get('MYSQL_DATABASE') or 'no credentials found'
MYSQL_USER = os.environ.get('MYSQL_USER') or 'no credentials found'
MYSQL_PASSWORD = os.environ.get('MYSQL_PASSWORD') or 'no credentials found'

app = Flask(__name__)
app.config['DEBUG'] = True
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = True
app.config['SECRET_KEY'] = SECRET_KEY
# app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:root@db:3306/db_flask'
app.config['SQLALCHEMY_DATABASE_URI'] = f'mysql+pymysql://{MYSQL_USER}:{MYSQL_PASSWORD}@db:3306/{MYSQL_DATABASE}'
app.config['SECURITY_PASSWORD_HASH'] = 'bcrypt'
app.config['SECURITY_PASSWORD_SALT'] = b'$2b$12$wqKlYjmOfXPghx3FuC3Pu.'

SWAGGER_URL="/swagger"
API_URL="/static/swagger.json"

swagger_ui_blueprint = get_swaggerui_blueprint(
    SWAGGER_URL,
    API_URL,
    config={
        'app_name': 'Access API'
    }
)
app.register_blueprint(swagger_ui_blueprint, url_prefix=SWAGGER_URL)

cors = CORS(app, supports_credentials=True)
app.config['CORS_HEADERS'] = 'Content-Type'
app.config['CONTENT_TYPE'] = 'application/json'

db.init_app(app)
migrate.init_app(app, db)

with app.app_context():
    db.drop_all()
    # create trip and activity tables
    db.reflect()
    db.create_all()

app.register_blueprint(routes)

if app.config['DEBUG']:
    @app.before_request
    def log_request_info():
        app.logger.debug('-------------------------------')
        # app.logger.debug('Headers: %s', request.headers)
        app.logger.debug('Body: %s', request.get_data())

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000, debug=True)


