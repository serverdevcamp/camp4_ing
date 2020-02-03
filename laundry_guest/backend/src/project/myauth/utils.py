def jwt_payload_handler(user):
    return {
        'user_id': user.id
    }


# def jwt_response_payload_handler(token, user=None, request=None):
#     return {
#         'token': token,
#         'user': "123"
#     }
