import pytest
from unittest.mock import patch, Mock
from flask import Flask
from src.controllers.sleep_controller import sleep_controller
from src.services.sleep_service import sleep_service


# Create a Flask app for testing
app = Flask(__name__)
app.register_blueprint(sleep_controller)


# Test for Missing Parameters
def test_get_sleep_missing_parameters():
    with app.test_client() as client:
        # Missing 'start_date' and 'end_date'
        response = client.get("/sleep?latitute=48.8566&longitude=2.3522")
        assert response.status_code == 400
        assert response.json == {"message": "Missing parameters"}


# Test for Successful Response from Service
@patch.object(sleep_service, 'get_sleep')
def test_get_sleep_success(mock_get_sleep):
    # Mock the response from the service layer
    mock_response = {"places": ["Hotel A", "Hotel B"]}
    mock_get_sleep.return_value = mock_response

    with app.test_client() as client:
        # Simulating a request with valid parameters
        response = client.get("/sleep?latitute=48.8566&longitude=2.3522&start_date=2023-01-01&end_date=2023-01-02")
        
        # Verify that the mock service function was called with the correct arguments
        mock_get_sleep.assert_called_once_with("48.8566", "2.3522", "2023-01-01", "2023-01-02")
        
        # Check the response
        assert response.status_code == 200
        assert response.json == mock_response


# Test for Error Handling in Service Layer
@patch.object(sleep_service, 'get_sleep')
def test_get_sleep_service_error(mock_get_sleep):
    # Simulate an exception from the service layer
    mock_get_sleep.side_effect = Exception("Service error")

    with app.test_client() as client:
        # Simulating a request with valid parameters
        response = client.get("/sleep?latitute=48.8566&longitude=2.3522&start_date=2023-01-01&end_date=2023-01-02")
        
        # Check that the response is an error message with status code 500
        assert response.status_code == 500
        assert response.json == {'message': 'An error occurred', 'error': 'Service error'}
