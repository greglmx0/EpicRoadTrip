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
        print("user_service.create_user")
        data = request.json
        print(data)
        username = data.get('username')
        password = data.get('password')
        email = data.get('email')

        if not username or not email or not password:
            return jsonify({'message': 'Username, email and password are required'}), 400

        # Check if user already exists by email or username
        user = User.query.filter_by(username=username).first()
        if user:
            return jsonify({'message': 'User already exists'}), 400

        user = User(username=username, email=email, password=password)
        db.session.add(user)
        db.session.commit()

        return jsonify({'message': 'User created successfully'}), 201

    def login_user():
        print("user_service.login_user")
        data = request.json
        print(data)
        username = data.get('username')
        password = data.get('password')

        if not username or not password:
            return jsonify({'message': 'Username and password are required'}), 400

        user = User.query.filter_by(username=username).first()
        if not user:
            return jsonify({'message': 'User does not exist'}), 400

        # Check if password is correct with bcrypt
        if not user_service.verify_password(user.password_hash, password):
            return jsonify({'message': 'Invalid password'}), 400
        
        if user:
            json_user = {
                "id": user.id,
                "username": user.username,
                "email": user.email
            }
            print(json_user)
            try:
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
            except Exception as e:
                return {
                    "error": "Something went wrong",
                    "message": str(e)
                }, 500

        return jsonify({'message': 'User logged in successfully'}), 200

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