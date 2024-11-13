import pytest
from unittest.mock import patch, Mock
from flask import Flask, jsonify
import os
from src.services.mapbox_service import mapbox_service  # Ensure correct path

# Initialize Flask app for the context of jsonify
app = Flask(__name__)

LATITUDE = "48.8566"
LONGITUDE = "2.3522"
QUERY = "London"
MAPBOX_ID = "abcd1234"
ROUTING = "driving"
DEPART_LAT = 48.8566
DEPART_LON = 2.3522
ARRIVE_LAT = 51.5074
ARRIVE_LON = -0.1278

# Mock environment variables for testing
@pytest.fixture(autouse=True)
def mock_env_vars(monkeypatch):
    monkeypatch.setenv('MAPBOX_ACCESS_TOKEN', 'mock-access-token')
    monkeypatch.setenv('MPABOX_API_URL', 'https://api.mapbox.com')
    monkeypatch.setenv('SESSION_TOKEN', 'mock-session-token')


# # Test case for successful get_suggest
# @patch("src.services.mapbox_service.requests.get")
# def test_get_suggest_success(mock_get):
#     # Mocking the API response
#     mock_response = Mock()
#     mock_response.status_code = 200
#     mock_response.json.return_value = {"suggestions": ["suggestion1", "suggestion2"]}
#     mock_get.return_value = mock_response

#     # Call the service method
#     result = mapbox_service.get_suggest(QUERY)

#     # Assertions
#     assert result == {"suggestions": ["suggestion1", "suggestion2"]}
    
#     # Assert the correct URL was called
#     mock_get.assert_called_once_with(
#         f"https://api.mapbox.com/search/searchbox/v1/suggest?q={QUERY}&access_token=mock-access-token&session_token=mock-session-token"
#     )


# # Test case for failed get_suggest (API error)
# @patch("src.services.mapbox_service.requests.get")
# def test_get_suggest_api_error(mock_get):
#     # Mocking the API error response
#     mock_response = Mock()
#     mock_response.status_code = 400
#     mock_response.json.return_value = {'message': 'An error occurred'}
#     mock_get.return_value = mock_response

#     # Call the service method
#     result, status_code = mapbox_service.get_suggest(QUERY)

#     # Assertions
#     assert result == {'message': 'An error occurred'}
#     assert status_code == 400
    
#     # Assert the correct URL was called
#     mock_get.assert_called_once_with(
#         f"https://api.mapbox.com/search/searchbox/v1/suggest?q={QUERY}&access_token=mock-access-token&session_token=mock-session-token"
#     )


# Test case for get_suggest with exception
@patch("src.services.mapbox_service.requests.get")
def test_get_suggest_exception(mock_get):
    # Mocking an exception thrown by requests.get
    mock_get.side_effect = Exception("Connection error")

    # Using Flask's app context for jsonify
    with app.app_context():
        result, status_code = mapbox_service.get_suggest(QUERY)

        # Assertions
        assert result.json == jsonify({'message': 'An error occurred', 'error': 'Connection error'}).json
        assert status_code == 500
        mock_get.assert_called_once()


# # Test case for successful get_retrieve
# @patch("src.services.mapbox_service.requests.get")
# def test_get_retrieve_success(mock_get):
#     # Mocking the API response
#     mock_response = Mock()
#     mock_response.status_code = 200
#     mock_response.json.return_value = {"features": ["feature1", "feature2"]}
#     mock_get.return_value = mock_response

#     # Call the service method
#     result = mapbox_service.get_retrieve(MAPBOX_ID)

#     # Assertions
#     assert result == {"features": ["feature1", "feature2"]}
    
#     # Assert the correct URL was called
#     mock_get.assert_called_once_with(
#         f"https://api.mapbox.com/search/searchbox/v1/retrieve/{MAPBOX_ID}?access_token=mock-access-token&session_token=mock-session-token"
#     )


# # Test case for failed get_retrieve (API error)
# @patch("src.services.mapbox_service.requests.get")
# def test_get_retrieve_api_error(mock_get):
#     # Mocking the API error response
#     mock_response = Mock()
#     mock_response.status_code = 400
#     mock_response.json.return_value = {'message': 'An error occurred'}
#     mock_get.return_value = mock_response

#     # Call the service method
#     result, status_code = mapbox_service.get_retrieve(MAPBOX_ID)

#     # Assertions
#     assert result == {'message': 'An error occurred'}
#     assert status_code == 400
    
#     # Assert the correct URL was called
#     mock_get.assert_called_once_with(
#         f"https://api.mapbox.com/search/searchbox/v1/retrieve/{MAPBOX_ID}?access_token=mock-access-token&session_token=mock-session-token"
#     )


# Test case for get_retrieve with exception
@patch("src.services.mapbox_service.requests.get")
def test_get_retrieve_exception(mock_get):
    # Mocking an exception thrown by requests.get
    mock_get.side_effect = Exception("Connection error")

    # Using Flask's app context for jsonify
    with app.app_context():
        result, status_code = mapbox_service.get_retrieve(MAPBOX_ID)

        # Assertions
        assert result.json == jsonify({'message': 'An error occurred', 'error': 'Connection error'}).json
        assert status_code == 500
        mock_get.assert_called_once()


# # Test case for successful get_trip
# @patch("src.services.mapbox_service.requests.get")
# def test_get_trip_success(mock_get):
#     # Mocking the API response
#     mock_response = Mock()
#     mock_response.status_code = 200
#     mock_response.json.return_value = {"routes": ["route1", "route2"]}
#     mock_get.return_value = mock_response

#     # Call the service method
#     result = mapbox_service.get_trip(DEPART_LAT, DEPART_LON, ARRIVE_LAT, ARRIVE_LON, ROUTING)

#     # Assertions
#     assert result == {"routes": ["route1", "route2"]}
    
#     # Assert the correct URL was called
#     mock_get.assert_called_once_with(
#         f"https://api.mapbox.com/directions/v5/mapbox/{ROUTING}/{DEPART_LAT},{DEPART_LON};{ARRIVE_LAT},{ARRIVE_LON}?alternatives=true&geometries=geojson&language=fr&overview=full&steps=true&access_token=mock-access-token&annotations=distance"
#     )


# # Test case for failed get_trip (API error)
# @patch("src.services.mapbox_service.requests.get")
# def test_get_trip_api_error(mock_get):
#     # Mocking the API error response
#     mock_response = Mock()
#     mock_response.status_code = 400
#     mock_response.json.return_value = {'message': 'An error occurred'}
#     mock_get.return_value = mock_response

#     # Call the service method
#     result, status_code = mapbox_service.get_trip(DEPART_LAT, DEPART_LON, ARRIVE_LAT, ARRIVE_LON, ROUTING)

#     # Assertions
#     assert result == {'message': 'An error occurred'}
#     assert status_code == 400
    
#     # Assert the correct URL was called
#     mock_get.assert_called_once_with(
#         f"https://api.mapbox.com/directions/v5/mapbox/{ROUTING}/{DEPART_LAT},{DEPART_LON};{ARRIVE_LAT},{ARRIVE_LON}?alternatives=true&geometries=geojson&language=fr&overview=full&steps=true&access_token=mock-access-token&annotations=distance"
#     )


# Test case for get_trip with exception
@patch("src.services.mapbox_service.requests.get")
def test_get_trip_exception(mock_get):
    # Mocking an exception thrown by requests.get
    mock_get.side_effect = Exception("Connection error")

    # Using Flask's app context for jsonify
    with app.app_context():
        result, status_code = mapbox_service.get_trip(DEPART_LAT, DEPART_LON, ARRIVE_LAT, ARRIVE_LON, ROUTING)

        # Assertions
        assert result.json == jsonify({'message': 'An error occurred', 'error': 'Connection error'}).json
        assert status_code == 500
        mock_get.assert_called_once()
