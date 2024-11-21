import pytest
from unittest.mock import patch, Mock
from flask import Flask, jsonify
from src.services.sleep_service import sleep_service  # Assurez-vous que le chemin est correct

# Initialisation de l'application Flask pour le contexte d'application
app = Flask(__name__)

LATITUDE = "48.8566"
LONGITUDE = "2.3522"
START_DATE = "2023-01-01"
END_DATE = "2023-01-02"
RADIUS = 22000

@patch("src.services.sleep_service.requests.get")
def test_get_sleep_success(mock_get):
    # Mock de la réponse de l'API avec un statut 200 et un texte de succès
    mock_response = Mock()
    mock_response.status_code = 200
    mock_response.json.return_value = {"result": "success"}
    mock_get.return_value = mock_response
    
    result = sleep_service.get_sleep(LATITUDE, LONGITUDE, START_DATE, END_DATE, RADIUS)
    
    assert result == {"result": "success"}
    mock_get.assert_called_once()


@patch("src.services.sleep_service.requests.get")
def test_get_sleep_api_error(mock_get):
    # Mock de la réponse de l'API avec un statut d'erreur (ex : 400)
    mock_response = Mock()
    mock_response.status_code = 400
    mock_response.json.return_value = {'message': 'An error occurred'}
    mock_get.return_value = mock_response
    
    result, status_code = sleep_service.get_sleep(LATITUDE, LONGITUDE, START_DATE, END_DATE, RADIUS)
    
    # Vérification que la réponse contient le message d'erreur
    assert result == {'message': 'An error occurred'}
    assert status_code == 400
    mock_get.assert_called_once()


@patch("src.services.sleep_service.requests.get")
def test_get_sleep_exception(mock_get):
    # Simulation d'une exception lors de l'appel de requests.get
    mock_get.side_effect = Exception("Connection error")
    
    # Utilisation d'un contexte d'application Flask pour `jsonify`
    with app.app_context():
        result, status_code = sleep_service.get_sleep(LATITUDE, LONGITUDE, START_DATE, END_DATE, RADIUS)

        # Vérification que la réponse contient le message d'erreur approprié
        assert result.json == jsonify({'message': 'Something went wrong'}).json
        assert status_code == 500
        mock_get.assert_called_once()
