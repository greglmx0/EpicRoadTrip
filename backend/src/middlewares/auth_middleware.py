from functools import wraps
import jwt
import os
from flask import request, abort
from src.models.user_model import User
from src.services.user_service import user_service

SECRET_KEY = os.environ.get('SECRET_KEY') or 'this is a secret'
# print('test auth', SECRET_KEY)


def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = None
        if "Authorization" in request.headers:
            token = request.headers["Authorization"].split(" ")[1]
        if not token:
            return {
                "message": "Authentication Token is missing!",
                "data": None,
                "error": "Unauthorized"
            }, 401
        try:
            data=jwt.decode(token, SECRET_KEY, algorithms=["HS256"])
            id = data["user_id"]
            current_user=user_service.get_user_by_id(None, id)
            print('jwt current user', current_user)
            if current_user is None:
                return {
                "message": "Invalid Authentication token!",
                "error": "Unauthorized"
            }, 401
        except jwt.ExpiredSignatureError:
            print("Token expiré. Veuillez vous reconnecter.")
        except jwt.InvalidTokenError:
            print("Token invalide. Veuillez vous reconnecter.")
        except Exception as e:
            return {
                "message": "Something went wrong",
                "error": str(e)
            }, 500

        return f(current_user, *args, **kwargs)

    return decorated