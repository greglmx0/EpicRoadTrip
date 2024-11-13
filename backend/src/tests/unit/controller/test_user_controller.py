import pytest
from unittest.mock import patch
from flask import Flask
from src.controllers.user_controller import user_controller
from src.services.user_service import user_service


# Create a Flask app for testing
app = Flask(__name__)
app.register_blueprint(user_controller)


# Test for User Registration with Missing or Invalid Data
def test_create_user_missing_data():
    with app.test_client() as client:
        response = client.post("/register", json={})  # sending empty json
        assert response.status_code == 400
        assert 'required property' in response.json["message"]  # Adjust to actual error message


# Test for Successful User Registration
@patch.object(user_service, 'create_user')
def test_create_user_success(mock_create_user):
    mock_create_user.return_value = {"message": "User created successfully"}
    
    with app.test_client() as client:
        response = client.post("/register", json={
            "email": "test@example.com",
            "password": "password123",
            "username": "testuser"
        })
        
        mock_create_user.assert_called_once()
        assert response.status_code == 200
        assert response.json == {"message": "User created successfully"}


# Test for User Login with Missing or Invalid Data
def test_login_user_missing_data():
    with app.test_client() as client:
        response = client.post("/login", json={})  # sending empty json
        assert response.status_code == 400
        assert 'required property' in response.json["message"]  # Adjust to actual error message


# # Test for Successful User Login
# @patch.object(user_service, 'login_user')
# def test_login_user_success(mock_login_user):
#     mock_login_user.return_value = {"message": "Login successful", "token": "fake-token"}
    
#     with app.test_client() as client:
#         response = client.post("/login", json={
#             "email": "test@example.com",
#             "password": "password123"
#         })
        
#         mock_login_user.assert_called_once()
#         assert response.status_code == 200
#         assert response.json == {"message": "Login successful", "token": "fake-token"}


# # Test for Get Users - Unauthorized Access
# @patch('src.middlewares.auth_middleware.token_required', lambda x: x)  # Mock middleware
# def test_get_users_unauthorized():
#     with app.test_client() as client:
#         response = client.get("/users")
#         assert response.status_code == 401
#         assert 'Unauthorized access' in response.json["message"]


# # Test for Get Users - Successful Response
# @patch.object(user_service, 'get_users')
# @patch('src.middlewares.auth_middleware.token_required', lambda x: x)  # Mock middleware
# def test_get_users_success(mock_get_users):
#     mock_get_users.return_value = {"users": [{"email": "test@example.com", "username": "testuser"}]}
    
#     with app.test_client() as client:
#         response = client.get("/users")
        
#         mock_get_users.assert_called_once()
#         assert response.status_code == 200
#         assert response.json == {"users": [{"email": "test@example.com", "username": "testuser"}]}


# Test for Google OAuth - Successful Response
@patch.object(user_service, 'aouth2_google')
def test_oauth2_google(mock_oauth2_google):
    mock_oauth2_google.return_value = {"message": "Google OAuth successful", "token": "oauth-token"}
    
    with app.test_client() as client:
        response = client.post("/auth/google", json={
            "google_token": "some-token"
        })
        
        mock_oauth2_google.assert_called_once()
        assert response.status_code == 200
        assert response.json == {"message": "Google OAuth successful", "token": "oauth-token"}


# Test for Logout - Successful Response
@patch.object(user_service, 'logout_user')
def test_logout_user(mock_logout_user):
    mock_logout_user.return_value = {"message": "Logout successful"}
    
    with app.test_client() as client:
        response = client.post("/logout")
        
        mock_logout_user.assert_called_once()
        assert response.status_code == 200
        assert response.json == {"message": "Logout successful"}


# # Test for Get User Info - Unauthorized Access
# @patch('src.middlewares.auth_middleware.token_required', lambda x: x)  # Mock middleware
# def test_get_user_info_unauthorized():
#     with app.test_client() as client:
#         response = client.get("/user/info")
#         assert response.status_code == 401
#         assert 'Unauthorized access' in response.json["message"]


# # Test for Get User Info - Successful Response
# @patch.object(user_service, 'get_user_info')
# @patch('src.middlewares.auth_middleware.token_required', lambda x: x)  # Mock middleware
# def test_get_user_info_success(mock_get_user_info):
#     mock_get_user_info.return_value = {"email": "test@example.com", "username": "testuser"}
    
#     with app.test_client() as client:
#         response = client.get("/user/info")
        
#         mock_get_user_info.assert_called_once()
#         assert response.status_code == 200
#         assert response.json == {"email": "test@example.com", "username": "testuser"}
