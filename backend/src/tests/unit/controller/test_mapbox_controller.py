import pytest
from unittest.mock import patch
from flask import Flask
from src.controllers.mapbox_controller import mapbox_controller
from src.services.mapbox_service import mapbox_service


# Create a Flask app for testing
app = Flask(__name__)
app.register_blueprint(mapbox_controller)


# Test for Suggest Route
@patch.object(mapbox_service, 'get_suggest')
def test_suggest(mock_get_suggest):
    # Mock the response from the service layer
    mock_response = {"suggestions": ["London", "London, UK"]}
    mock_get_suggest.return_value = mock_response
    
    with app.test_client() as client:
        response = client.get("/mapbox/suggest?query=london")
        
        # Verify that the mock service function was called with the correct arguments
        mock_get_suggest.assert_called_once_with("london")
        
        # Check the response
        assert response.status_code == 200
        assert response.json == mock_response


# Test for Retrieve Route
@patch.object(mapbox_service, 'get_retrieve')
def test_retrieve(mock_get_retrieve):
    # Mock the response from the service layer
    mock_response = {"mapbox_id": "123", "location": "London"}
    mock_get_retrieve.return_value = mock_response
    
    with app.test_client() as client:
        response = client.get("/mapbox/retrieve?mapbox_id=123")
        
        # Verify that the mock service function was called with the correct mapbox_id
        mock_get_retrieve.assert_called_once_with("123")
        
        # Check the response
        assert response.status_code == 200
        assert response.json == mock_response


# Test for Trip Route
@patch.object(mapbox_service, 'get_trip')
def test_trip(mock_get_trip):
    # Mock the response from the service layer
    mock_response = {"route": "some_route", "distance": "5 km"}
    mock_get_trip.return_value = mock_response
    
    # Parameters to simulate
    depart_lat = "48.8566"
    depart_lon = "2.3522"
    arrive_lat = "51.5074"
    arrive_lon = "-0.1278"
    routing = "fastest"
    
    with app.test_client() as client:
        response = client.get(f"/mapbox/trip?depart_lat={depart_lat}&depart_lon={depart_lon}&arrive_lat={arrive_lat}&arrive_lon={arrive_lon}&routing={routing}")
        
        # Verify that the mock service function was called with the correct arguments
        mock_get_trip.assert_called_once_with(depart_lat, depart_lon, arrive_lat, arrive_lon, routing)
        
        # Check the response
        assert response.status_code == 200
        assert response.json == mock_response
