from src.config.database import db


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
    