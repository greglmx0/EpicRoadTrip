from datetime import datetime
from flask import jsonify, request, make_response
from src.models.trip_model import Trip
from src.models.activity_model import Activity
from src.config.database import db
from datetime import datetime

class trip_service:
    def create_trip(user):
        try:
            payload = request.json
            activities = payload.get('listInterestActivities')
            print("wowowow",user.get('id'))
            trip = format_trip(payload, user.get('id'))

            trip = Trip(**trip)
            db.session.add(trip)
            db.session.commit()

            for activity in activities:
                activity = format_activity(activity, trip.id)
                activity = Activity(**activity)
                trip.activities.append(activity)

            db.session.commit()

            return jsonify({'message': 'Trip created successfully'}), 201

        except Exception as e:
            return jsonify({'message': 'An error occurred', 'error': str(e)}), 500

    def get_trip_by_id(id):
        try:
            trip = Trip.get_by_id(id)
            if not trip:
                return jsonify({'message': 'Trip not found'}), 404
            return jsonify(trip.serialize()), 200

        except Exception as e:
            return jsonify({'message': 'An error occurred', 'error': str(e)}), 500
        
def format_activity(activity, trip_id):
        date_time = activity.get('dateTime')
        if date_time:
            # transform 2025-03-09T15:00:00Z to 2025-03-09 15:00:00
            date_time = datetime.strptime(date_time, '%Y-%m-%dT%H:%M:%SZ')

        activity = {
            'id': activity.get('id'),
            'trip_id': trip_id,
            'category': activity.get('category'),
            'name': activity.get('name'),
            'venue': activity.get('venue'),
            'location': activity.get('location'),
            'description': activity.get('description'),
            'genre': activity.get('genre'),
            'link': activity.get('link'),
            'extra_link': activity.get('extraLink'),
            'date_time': date_time,
            'latitude': activity.get('latitude'),
            'longitude': activity.get('longitude'),
            'picture': activity.get('picture'),
            'price_range_min': activity.get('priceRangeMin'),
            'price_range_max': activity.get('priceRangeMax')
        }
        
        return activity
    
def format_trip(payload, user_id):
    range = payload.get('range')
    range_start = range.get('start')
    range_end = range.get('end')
    depart = payload.get('depart')
    arrive = payload.get('arrive')

    return {
        'user_id': user_id,
        'range_start':  datetime.strptime(range_start, '%Y-%m-%dT%H:%M:%S.%fZ'),
        'range_end':  datetime.strptime(range_end, '%Y-%m-%dT%H:%M:%S.%fZ'),
        'depart_latitude': depart[0],
        'depart_longitude': depart[1],
        'arrive_latitude': arrive[0],
        'arrive_longitude': arrive[1],
        'routing_type': payload.get('routingType')
    }