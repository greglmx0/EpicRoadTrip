from src.config.database import db

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
