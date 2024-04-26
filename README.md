# T-WEB-800

## stack technique utilisée :

- flask (flask, pathlib, python-dotenv, PyJWT, pillow, Flask-SQLAlchemy, Flask-Migrate, flask-bcrypt, pymysql, cryptography)
- angular

## Installation

### Create .env file from .env.example

```
cp .env.example .env
```

Ne pas oublier de modifier les valeurs des variables d'environnement dans le fichier .env

### Run docker compose

```
docker-composeup
```

or run in background
```
docker-compose up -d
```

frontend : http://localhost:4200 \
backend : http://localhost:5000
