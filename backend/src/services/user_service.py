from datetime import datetime, timedelta
from flask import jsonify, request, make_response
import jwt
from src.models.user_model import User
from src.config.database import db
import os
import bcrypt
import requests

SECRET_KEY = os.environ.get('SECRET_KEY') or 'this is a secret'
GOOGLE_CLIENT_SECRET = os.environ.get(
    'GOOGLE_CLIENT_SECRET') or 'this is a secret'
GOOGLE_CLIENT_ID = os.environ.get('GOOGLE_CLIENT_ID') or 'this is a secret'
GOOGLE_REDIRECT_URI = os.environ.get('GOOGLE_REDIRECT_URI') or 'this is a secret'


class user_service:
    def create_user():
        try:
            print("user_service.create_user", request.json)
            payload = request.json
            username = payload.get('username')
            password = payload.get('password')
            email = payload.get('email')

            username_db = User.query.filter_by(username=username).first()
            email_db = User.query.filter_by(email=email).first()
            if username_db or email_db:
                return jsonify({'message': 'Email or username already exists'}), 400

            user = User(username=username, email=email, password=password)
            db.session.add(user)
            db.session.commit()
            return jsonify({'message': 'User created successfully'}), 201

        except Exception as e:
            return jsonify({'message': 'An error occurred', 'error': str(e)}), 500

    def login_user():
        try:
            print("user_service.login_user", request.json)
            payload = request.json
            username = payload.get('username')
            password = payload.get('password')

            user = User.query.filter_by(username=username).first()

            if not user:
                return jsonify({'message': 'User not found'}), 404

            if not user_service.verify_password(user.password_hash, password):
                return jsonify({'message': 'Could not verify', 'authenticated': False}), 401

            if user:
                return user_service.make_response_with_cookie('User logged in successfully', user_service.create_token(user))

        except Exception as e:
            return {
                "error": "Something went wrong",
                "message": str(e)
            }, 500

    def create_token(user):
        # expires_at = datetime.now() + timedelta(hours=24)
        # json_user = {
        #     "id": user.id,
        #     "username": user.username,
        #     "email": user.email
        # }
        payload = {
            "user_id": user.id,
            # "user": json_user,
            # "exp": expires_at
        }
        token = jwt.encode(
            payload,
            SECRET_KEY,
            algorithm="HS256"
        )
        return token

    def verify_password(password_hash, password):
        return bcrypt.checkpw(password.encode('utf-8'), password_hash.encode('utf-8'))

    def get_users():
        users = User.query.all()
        return jsonify([user.serialize() for user in users])

    def aouth2_google():
        if not request.json:
            return jsonify({'message': 'Access denied'}), 403
        code = request.json.get('code')
        if not code:
            return jsonify({'message': 'Access denied'}), 403

        access_token = user_service.google_access_tokens(code)
        if not access_token:
            return jsonify({'message': 'Credentials are invalid'}), 403
        user_info = user_service.google_user_info(access_token)
        user_db = User.query.filter_by(google_id=user_info.get('id')).first()

        if user_db:
            return user_service.make_response_with_cookie('User logged in successfully', user_service.create_token(user_db))

        created_user = user_service.create_user_with_google(
            user_info.get('email'),
            user_info.get('name'),
            user_info.get('id'),
            'google')

        if created_user:
            return user_service.make_response_with_cookie('User created successfully', user_service.create_token(created_user))
        return jsonify({'message': 'Access denied'}), 403

    def google_access_tokens(code):
        url = "https://oauth2.googleapis.com/token"
        payload = f'code={code}' + \
            f'&client_id={GOOGLE_CLIENT_ID}' +\
            f'&client_secret={GOOGLE_CLIENT_SECRET}' +\
            f'&redirect_uri={GOOGLE_REDIRECT_URI}' +\
            f'&grant_type=authorization_code'

        headers = {
            'Content-Type': 'application/x-www-form-urlencoded',
        }

        response = requests.request("POST", url, headers=headers, data=payload)
        return response.json().get('access_token')

    def google_user_info(access_token):
        url = "https://www.googleapis.com/oauth2/v1/userinfo"
        headers = {
            'Authorization': f'Bearer {access_token}'
        }
        response = requests.request("GET", url, headers=headers)
        return response.json()

    def create_user_with_google(email, username, google_id, auth_provider):
        user = User(email=email, username=username,
                    google_id=google_id, auth_provider=auth_provider)
        db.session.add(user)
        db.session.commit()
        created_user = User.query.filter_by(google_id=google_id).first()
        return created_user

    def make_response_with_cookie(message, token):
        response = make_response(jsonify({'message': message, 'token': token}))
        response.set_cookie('auth_token', token,
                            httponly=True,  secure=True, samesite='Strict')
        return response

    def logout_user():
        response = make_response(
            jsonify({'message': 'User logged out successfully'}))
        response.set_cookie('auth_token', '', expires=0)
        return response

    def get_user_info(current_user):
        print("user_service.get_user_info", current_user)
        return jsonify(current_user)
