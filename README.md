# EpicRoadTrip

EpicRoadTrip is a full-stack web application that helps users plan trips with points of interest. The project features a modern Angular frontend and a Flask backend, with Docker support for easy deployment. Users can search for activities, create and save itineraries, and manage their trips. The application supports authentication (including Google login), interactive maps, and both light and dark themes. The backend uses a MySQL database and provides a REST API documented with Swagger.

Main features:

Search for nearby activities and points of interest
Plan and save custom itineraries
User authentication (email/password & Google)
Responsive design with light/dark mode
Interactive maps (Mapbox)
REST API with Swagger documentation
Dockerized for development and production
Tech stack: Angular 17, Tailwind CSS, Flask, SQLAlchemy, MySQL, Docker

## stack technique utilisée :

- flask

  - flask # (le framework)
  - pathlib # (pour la gestion des chemins)
  - python-dotenv # (pour les variables d'environnement)
  - PyJWT # (pour les tokens JWT)
  - pillow # (pour le traitement des images)
  - Flask-SQLAlchemy # (pour la base de données)
  - Flask-Migrate # (pour les migrations de la base de données)
  - pymysql #( pour la connexion à la base de données)
  - flask-bcrypt # (pour le hachage des mots de passe)
  - cryptography #( pour le chiffrement des mots de passe)
  - flask-cors # (pour les requêtes cross-origin )
  - flask_swagger_ui # (pour la documentation swagger)
  - requests # (pour les requêtes HTTP)
  - flask-validate-json # (pour la validation des données)
  - Flask-Parameter-Validation # (pour la validation des paramètres)
  - gunicorn # (pour le déploiement)
  - pytest-cov # (pour le rapport de couverture)

- angular 17.3.0

## Installation

### Create .env file from .env.example

```
cp .env.example .env
```

Ne pas oublier de modifier les valeurs des variables d'environnement dans le fichier .env

### Create environment file for angular (frontend)

```
cp frontend/src/environments/environment.ts frontend/src/environments/environment.development.ts
```

Ne pas oublier de modifier les valeurs des variables d'environnement dans le fichier environment.development.ts

### Run docker compose

```
docker-compose up
```

Pour les lance en arrrière plan :

```
docker-compose up -d
```

Pour rebuild les images docker (si des dependances ont été ajoutées ou modifiées) :

```
docker-compose up --build
```

## Accès à l'application devlopment

frontend : http://localhost:4200 \
backend : http://localhost:5000 \
swagger : http://localhost:5000/swagger \
phpmyadmin : http://localhost:8080

## Accès à l'application production

frontend : https://greglmx.com \
backend : https://api.greglmx.com \
swagger : https://api.greglmx.com/swagger \
phpmyadmin : https://pma.greglmx.com

## Documentation

latitudes - longitudes

La latitude de la ville de Rennes est 48.0833 et la longitude de la ville de Rennes est -1.6833.

## TODO :

- [x] Ajouter les tests unitaires
- [ ] Verifier latitudes - longitudes
- [ ] Sauvegarder les trajets
- [ ] Points d'intérêts dans la base de données
- [ ] Style de l'application
- [ ] Responsive design
- [ ] Ajouter loading dans les requêtes HTTP
- [ ] Ajouter des messages d'erreurs
- [ ] Ajouter des messages de succès
- [ ] Ajouter des messages de confirmation
- [ ] Exporter les trajets en PDF
- [ ] Exporter les trajets lein
- [x] Moyen de transport (voiture, vélo, piéton)
- [ ] Budget
- [x] out2 (google)
- [x] tu 75% backend
- [ ] unit test ci
