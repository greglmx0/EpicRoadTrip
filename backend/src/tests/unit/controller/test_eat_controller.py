import pytest
from unittest.mock import patch, Mock
from flask import Flask, jsonify
from src.controllers.eat_controller import eat_controller
from src.services.eat_service import eat_service


# Create a Flask app for testing
app = Flask(__name__)
app.register_blueprint(eat_controller)

# Test for Missing Parameters
def test_get_eat_missing_parameters():
    with app.test_client() as client:
        response = client.get("/eat?latitute=48.8566&longitude=2.3522")
        assert response.status_code == 400
        assert response.json == {"message": "Missing parameters"}

# Test for Successful Response from Service
@patch.object(eat_service, 'get_eat')
def test_get_eat_success(mock_get_eat):
    # Mock the response from the service layer
    mock_response = {"result": "success"}
    mock_get_eat.return_value = mock_response
    
    with app.test_client() as client:
        response = client.get("/eat?latitute=48.8566&longitude=2.3522&start_date=2023-01-01&end_date=2023-01-02")
        
        # Verify that the mock service function was called once with the correct arguments
        mock_get_eat.assert_called_once_with("48.8566", "2.3522", "2023-01-01", "2023-01-02")
        
        # Check the response
        assert response.status_code == 200
        assert response.json == mock_response

# Test for Error Handling in Service Layer
@patch.object(eat_service, 'get_eat')
def test_get_eat_service_error(mock_get_eat):
    # Simulate an exception from the service layer
    mock_get_eat.side_effect = Exception("Service error")
    
    with app.test_client() as client:
        response = client.get("/eat?latitute=48.8566&longitude=2.3522&start_date=2023-01-01&end_date=2023-01-02")
        
        # Check that the response is an error message with status code 500
        assert response.status_code == 500
        assert response.json == {'message': 'An error occurred', 'error': 'Service error'}
