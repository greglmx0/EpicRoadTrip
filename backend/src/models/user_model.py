import bcrypt
from src.config.database import db


class User(db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    google_id = db.Column(db.String(255), unique=True, nullable=True)
    username = db.Column(db.String(50), unique=True, nullable=True)
    email = db.Column(db.String(100), unique=True, nullable=False)
    password_hash = db.Column(db.String(100), nullable=True)
    auth_provider = db.Column(db.String(50), nullable=False, default='local')
    created_at = db.Column(db.DateTime, default=db.func.current_timestamp())
    updated_at = db.Column(db.DateTime, default=db.func.current_timestamp(
    ), onupdate=db.func.current_timestamp())

    @property
    def password(self):
        raise AttributeError('password not readable')

    @password.setter
    def password(self, password):
        self.password_hash = bcrypt.hashpw(password.encode(
            'utf-8'), bcrypt.gensalt()).decode('utf-8')

    def serialize(self):
        return {
            "id": self.id,
            "google_id": self.google_id,
            "username": self.username,
            "email": self.email,
            "auth_provider": self.auth_provider
        }

    @staticmethod
    def get_by_id(id):
        return User.query.filter_by(id=id).first()

    # find user with google id
    @staticmethod
    def get_by_google_id(google_id):
        return User.query.filter_by(google_id=google_id).first()
