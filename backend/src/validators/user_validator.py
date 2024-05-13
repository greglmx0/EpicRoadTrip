create_user_schema = {
    'type': 'object',
    'properties': {
        'username': {'type': 'string', 'minLength': 3, 'maxLength': 20, 'pattern': '^[a-zA-Z0-9_]*$'},
        'password': {'type': 'string'},
        'email': {'type': 'string'}
    },
    'required': ['username', 'password', 'email'],
}

login_user_schema = {
    'type': 'object',
    'properties': {
        'username': {'type': 'string'},
        'password': {'type': 'string'}
    },
    'required': ['username', 'password'],
}