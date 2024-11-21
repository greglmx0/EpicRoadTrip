from datetime import datetime
from flask import jsonify, request, make_response
from src.models.trip_model import Trip
from src.config.database import db

class trip_service:
   def create_trip():
       try:
           print("trip_service.create_trip", request.json)
           payload = request.json
           range_start = payload.get('rangeStart')
           range_end = payload.get('rangeEnd')
           depart_latitude = payload.get('departLatitude')
           depart_longitude = payload.get('departLongitude')
           arrive_latitude = payload.get('arriveLatitude')
           arrive_longitude = payload.get('arriveLongitude')
           routing_type = payload.get('routingType')
           interest_activities = payload.get('interestActivities')

           trip = Trip(range_start=range_start, range_end=range_end, depart_latitude=depart_latitude, depart_longitude=depart_longitude, arrive_latitude=arrive_latitude, arrive_longitude=arrive_longitude, routing_type=routing_type)
           db.session.add(trip)
           db.session.commit()

           for activity in interest_activities:
               trip.interest_activities.append(activity)

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