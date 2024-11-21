create_trip_schema = {
    'type': 'object',
    'properties': {
        'range': {
            'type': 'object',
            'properties': {
                'start': {'type': 'string', 'format': 'date-time'},
                'end': {'type': 'string', 'format': 'date-time'}
            },
            'required': ['start', 'end']
        },
        'depart': {
            'type': 'array',
            'items': {'type': 'number'},
            'minItems': 2,
            'maxItems': 2
        },
        'arrive': {
            'type': 'array',
            'items': {'type': 'number'},
            'minItems': 2,
            'maxItems': 2
        },
        'routingType': {
            'type': 'string',
            'enum': ['walking', 'driving', 'cycling', 'transit']
        },
        'listInterestActivities': {
            'type': 'array',
            'items': {
                'type': 'object',
                'properties': {
                    'id': {'type': 'string', 'minLength': 1},
                    'category': {'type': 'string', 'enum': ['enjoy', 'eat', 'explore']},
                    'name': {'type': 'string', 'minLength': 1},
                    'venue': {'type': 'string'},
                    'location': {'type': 'string'},
                    'description': {'type': 'string'},
                    'genre': {'type': 'string'},
                    'link': {'type': 'string', 'format': 'uri'},
                    'extraLink': {'type': 'string', 'format': 'uri'},
                    'dateTime': {'type': ['string', 'null'], 'format': 'date-time'},
                    'latitude': {'type': 'number'},
                    'longitude': {'type': 'number'},
                    'picture': {'type': ['string', 'null'], 'format': 'uri'},
                    'priceRangeMin': {'type': ['number', 'null'], 'minimum': 0},
                    'priceRangeMax': {'type': ['number', 'null'], 'minimum': 0}
                },
                'required': ['id', 'category', 'name', 'latitude', 'longitude']
            }
        }
    },
    'required': ['range', 'depart', 'arrive', 'routingType']
}
