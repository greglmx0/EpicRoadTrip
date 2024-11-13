import pytest
from unittest.mock import patch, Mock
from flask import Flask, jsonify
from src.controllers.enjoy_controller import enjoy_controller
from src.services.enjoy_service import enjoy_service


# Create a Flask app for testing
app = Flask(__name__)
app.register_blueprint(enjoy_controller)

# Test for Missing Parameters
def test_get_enjoy_missing_parameters():
    with app.test_client() as client:
        response = client.get("/enjoy?latitute=48.8566&longitude=2.3522")
        assert response.status_code == 400
        assert response.json == {"message": "Missing parameters"}

# Test for Successful Response from Service
@patch.object(enjoy_service, 'get_enjoy')
def test_get_enjoy_success(mock_get_enjoy):
    # Mock the response from the service layer
    mock_response = {"result": "success"}
    mock_get_enjoy.return_value = mock_response
    
    with app.test_client() as client:
        response = client.get("/enjoy?latitute=48.8566&longitude=2.3522&start_date=2023-01-01&end_date=2023-01-02")
        
        # Verify that the mock service function was called once with the correct arguments
        mock_get_enjoy.assert_called_once_with("48.8566", "2.3522", "2023-01-01", "2023-01-02")
        
        # Check the response
        assert response.status_code == 200
        assert response.json == mock_response

# Test for Error Handling in Service Layer
@patch.object(enjoy_service, 'get_enjoy')
def test_get_enjoy_service_error(mock_get_enjoy):
    # Simulate an exception from the service layer
    mock_get_enjoy.side_effect = Exception("Service error")
    
    with app.test_client() as client:
        response = client.get("/enjoy?latitute=48.8566&longitude=2.3522&start_date=2023-01-01&end_date=2023-01-02")
        
        # Check that the response is an error message with status code 500
        assert response.status_code == 500
        assert response.json == {'message': 'An error occurred', 'error': 'Service error'}
