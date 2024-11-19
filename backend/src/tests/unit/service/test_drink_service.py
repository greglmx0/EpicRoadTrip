import pytest
from unittest.mock import patch, Mock
from flask import Flask, jsonify
from src.services.drink_service import drink_service  # Import correct de la classe drink_service

# Initialise l'application Flask pour le contexte d'application
app = Flask(__name__)

LATITUDE = "48.8566"
LONGITUDE = "2.3522"
START_DATE = "2023-01-01"
END_DATE = "2023-01-02"
RADIUS = 22000

@patch("src.services.drink_service.requests.get")
def test_get_drink_success(mock_get):
    # Configure le mock pour renvoyer un JSON en utilisant json.return_value
    mock_response = Mock()
    mock_response.status_code = 200
    mock_response.json.return_value = {"result": "success"}
    mock_get.return_value = mock_response
    
    result = drink_service.get_drink(LATITUDE, LONGITUDE, START_DATE, END_DATE, RADIUS)
    
    # Comparaison avec un dictionnaire attendu
    assert result == {"result": "success"}
    mock_get.assert_called_once()


@patch("src.services.drink_service.requests.get")
def test_get_drink_api_error(mock_get):
    # Simule une réponse avec un statut d'erreur (ex : 400)
    mock_response = Mock()
    mock_response.status_code = 400
    mock_response.json.return_value = {'message': 'An error occurred'}
    mock_get.return_value = mock_response
    
    result, status_code = drink_service.get_drink(LATITUDE, LONGITUDE, START_DATE, END_DATE, RADIUS)
    
    assert result == {'message': 'An error occurred'}
    assert status_code == 400
    mock_get.assert_called_once()


@patch("src.services.drink_service.requests.get")
def test_get_drink_exception(mock_get):
    # Simule une exception lors de l'appel de requests.get
    mock_get.side_effect = Exception("Connection error")
    
    # Utilisation d'un contexte d'application pour `jsonify`
    with app.app_context():
        result, status_code = drink_service.get_drink(LATITUDE, LONGITUDE, START_DATE, END_DATE, RADIUS)

        assert result.json == jsonify({'message': 'Something went wrong'}).json
        assert status_code == 500
        mock_get.assert_called_once()
