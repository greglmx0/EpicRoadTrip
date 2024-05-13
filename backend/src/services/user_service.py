from datetime import datetime, timedelta
from flask import jsonify, request
import jwt
from src.models.user_model import User
from src.config.database import db
import os
import bcrypt

SECRET_KEY = os.environ.get('SECRET_KEY') or 'this is a secret'

class user_service:
    def create_user():
        try:
            print("user_service.create_user", request.json)
            payload = request.json
            username = payload.get('username')
            password = payload.get('password')
            email = payload.get('email')

            username_db = User.query.filter_by(username=username).first()
            if username_db:
                return jsonify({'message': 'Username already exists'}), 409

            email_db = User.query.filter_by(email=email).first()
            if email_db:
                return jsonify({'message': 'Email already exists'}), 409

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

            if not user :
                return jsonify({'message': 'User not found'}), 404

            if not user_service.verify_password(user.password_hash, password):
                return jsonify({'message': 'Could not verify', 'authenticated': False}), 401

            if user:
                json_user = {
                    "id": user.id,
                    "username": user.username,
                    "email": user.email
                }
                print("user json: ", json_user)
                expires_at = datetime.now() + timedelta(hours=24)
                payload = {
                    "user_id": user.id,
                    # "exp": expires_at
                }
                token = jwt.encode(
                    payload,
                    SECRET_KEY,
                    algorithm="HS256"
                )
                return {
                    "message": "Successfully fetched auth token",
                    "token": token,
                }
            return jsonify({'message': 'User logged in successfully'}), 200

        except Exception as e:
            return {
                "error": "Something went wrong",
                "message": str(e)
            }, 500


    def verify_password(password_hash, password):
        return bcrypt.checkpw(password.encode('utf-8'), password_hash.encode('utf-8'))

    def get_users():
        users = User.query.all()
        return jsonify([user.serialize() for user in users])
    
    def get_user_by_id(self, id):
        user = User.get_by_id(id)
        if not user:
            return None
        if user.id == id:
            return User.serialize(user)
        return None