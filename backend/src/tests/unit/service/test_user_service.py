import pytest
from unittest.mock import patch, Mock
from flask import Flask, jsonify, request, make_response
from src.services.user_service import user_service
from src.models.user_model import User
from src.config.database import db
import jwt
import bcrypt

# Initialize Flask app for testing context
app = Flask(__name__)
app.config['SECRET_KEY'] = 'this is a secret'

SECRET_KEY = 'this is a secret'

@pytest.fixture
def test_client():
    with app.test_client() as client:
        with app.app_context():
            yield client

# Mocks and data for testing
mock_user_data = {
    "id": 1,
    "username": "testuser",
    "email": "test@example.com",
    "password": "testpassword",
    "password_hash": bcrypt.hashpw("testpassword".encode('utf-8'), bcrypt.gensalt()).decode('utf-8')
}

@pytest.fixture
def mock_user():
    user = User(
        id=mock_user_data["id"],
        username=mock_user_data["username"],
        email=mock_user_data["email"]
    )
    user.password_hash = mock_user_data["password_hash"]
    return user

# Test create_user
@patch('src.models.user_model.User.query')
@patch('src.config.database.db.session.add')
@patch('src.config.database.db.session.commit')
def test_create_user(mock_commit, mock_add, mock_query, test_client):
    with app.app_context():
        mock_query.filter_by.return_value.first.side_effect = [None, None]  # Mock no existing user
        mock_add.return_value = None
        mock_commit.return_value = None

        with app.test_request_context(json={
            "username": "newuser",
            "password": "newpassword",
            "email": "new@example.com"
        }):
            response = user_service.create_user()
            assert response[1] == 201  # Status code for created
            assert response[0].json['message'] == 'User created successfully'

# Test create_user_existing_user
@patch('src.models.user_model.User.query')
def test_create_user_existing_user(mock_query, test_client):
    with app.app_context():
        mock_query.filter_by.return_value.first.return_value = mock_user_data  # Mock existing user

        with app.test_request_context(json={
            "username": "testuser",
            "password": "newpassword",
            "email": "test@example.com"
        }):
            response = user_service.create_user()
            assert response[1] == 400  # Status code for bad request
            assert response[0].json['message'] == 'Email or username already exists'

# # Test login_user
# @patch('src.models.user_model.User.query')
# @patch.object(user_service, 'verify_password', return_value=True)
# @patch.object(user_service, 'create_token', return_value="mocked_token")
# def test_login_user(mock_create_token, mock_verify_password, mock_query, test_client, mock_user):
#     # Ensure we are in the app context
#     with app.app_context():
#         mock_query.filter_by.return_value.first.return_value = mock_user
#         with app.test_request_context(json={
#             "username": "testuser",
#             "password": "testpassword"
#         }):
#             response = user_service.login_user()

#             # Fix: Access JSON content using .json or .get_json()
#             response_json = response[0].json()  # Get JSON data from the response

#             assert response[1] == 200  # Check for successful status code
#             assert response_json['message'] == 'User logged in successfully'
#             assert response_json['token'] == "mocked_token"

# Test login_user_not_found
@patch('src.models.user_model.User.query')
def test_login_user_not_found(mock_query, test_client):
    with app.app_context():
        mock_query.filter_by.return_value.first.return_value = None  # Mock user not found
        with app.test_request_context(json={
            "username": "nonexistentuser",
            "password": "password"
        }):
            response = user_service.login_user()
            assert response[1] == 404
            assert response[0].json['message'] == 'User not found'

# Test create_token
def test_create_token(mock_user):
    token = user_service.create_token(mock_user)
    decoded_token = jwt.decode(token, SECRET_KEY, algorithms=["HS256"])
    assert decoded_token['user_id'] == mock_user_data['id']

# Test google_user_info
@patch('requests.request')
def test_google_user_info(mock_request):
    mock_request.return_value = Mock(status_code=200, json=lambda: {"id": "12345", "email": "test@google.com", "name": "Test User"})
    response = user_service.google_user_info("mock_access_token")
    assert response['id'] == "12345"
    assert response['email'] == "test@google.com"

# # Test make_response_with_cookie
# def test_make_response_with_cookie():
#     with app.app_context():
#         response = user_service.make_response_with_cookie("Test message", "testtoken")
#         assert response.get_json()['message'] == "Test message"
#         assert response.cookies.get("auth_token") == "testtoken"

# # Test logout_user
# def test_logout_user():
#     with app.app_context():
#         response = user_service.logout_user()
#         assert response.get_json()['message'] == "User logged out successfully"
#         assert response.cookies.get("auth_token") == ""

# # Test get_user_info
# @patch('src.models.user_model.User.serialize')
# @patch('src.models.user_model.User.query')
# def test_get_user_info(mock_query, mock_user, test_client):
#     with app.app_context():
#         # Mock the return value of the query
#         mock_query.filter_by.return_value.first.return_value = mock_user

#         # Simulate a request
#         with app.test_request_context():
#             response = user_service.get_user_info(mock_user)

#             response_json = response.json()

#             assert response.status_code == 200
#             assert response_json['username'] == mock_user.username
#             assert response_json['email'] == mock_user.email

