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

### Create environment file for angular (frontend)

```
cp frontend/src/environments/environment.ts.example frontend/src/environments/environment.development.ts
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

frontend : http://localhost:4200 \
backend : http://localhost:5000
