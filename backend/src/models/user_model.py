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


class Activity(db.Model):
    __tablename__ = 'activities'

    id = db.Column(db.String(255), primary_key=True)  # Using the given "id" as primary key
    trip_id = db.Column(db.Integer, db.ForeignKey('trips.id'), nullable=False)
    category = db.Column(db.String(50), nullable=False)
    name = db.Column(db.String(255), nullable=False)
    venue = db.Column(db.String(255), nullable=True)
    location = db.Column(db.String(255), nullable=True)
    description = db.Column(db.Text, nullable=True)
    genre = db.Column(db.String(100), nullable=True)
    link = db.Column(db.String(500), nullable=True)
    extra_link = db.Column(db.String(500), nullable=True)
    date_time = db.Column(db.DateTime, nullable=True)
    latitude = db.Column(db.Float, nullable=False)
    longitude = db.Column(db.Float, nullable=False)
    picture = db.Column(db.String(500), nullable=True)
    price_range_min = db.Column(db.Float, nullable=True)
    price_range_max = db.Column(db.Float, nullable=True)

    def serialize(self):
        return {
            "id": self.id,
            "category": self.category,
            "name": self.name,
            "venue": self.venue,
            "location": self.location,
            "description": self.description,
            "genre": self.genre,
            "link": self.link,
            "extraLink": self.extra_link,
            "dateTime": self.date_time.isoformat() if self.date_time else None,
            "latitude": self.latitude,
            "longitude": self.longitude,
            "picture": self.picture,
            "priceRangeMin": self.price_range_min,
            "priceRangeMax": self.price_range_max,
        }


class Trip(db.Model):
    __tablename__ = 'trips'

    id = db.Column(db.Integer, primary_key=True)
    range_start = db.Column(db.DateTime, nullable=False)
    range_end = db.Column(db.DateTime, nullable=False)
    depart_latitude = db.Column(db.Float, nullable=False)
    depart_longitude = db.Column(db.Float, nullable=False)
    arrive_latitude = db.Column(db.Float, nullable=False)
    arrive_longitude = db.Column(db.Float, nullable=False)
    routing_type = db.Column(db.String(50), nullable=False)
    created_at = db.Column(db.DateTime, default=db.func.current_timestamp())
    updated_at = db.Column(db.DateTime, default=db.func.current_timestamp(), onupdate=db.func.current_timestamp())

    # Relationship with InterestActivity
    interest_activities = db.relationship('InterestActivity', backref='trip', cascade="all, delete-orphan")

    def serialize(self):
        return {
            "id": self.id,
            "range": {
                "start": self.range_start.isoformat(),
                "end": self.range_end.isoformat()
            },
            "depart": [self.depart_latitude, self.depart_longitude],
            "arrive": [self.arrive_latitude, self.arrive_longitude],
            "routingType": self.routing_type,
            "listInterestActivities": [activity.serialize() for activity in self.interest_activities]
        }

    @staticmethod
    def get_by_id(id):
        return Trip.query.filter_by(id=id).first()
    