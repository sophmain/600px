from flask import Blueprint, request, jsonify
from ..models import db, Photo
from sqlalchemy import  or_


search_routes = Blueprint('search', __name__)

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages


@search_routes.route('', methods=['GET', 'POST'])
def search():
    query = request.args.get('q')
    print('query', query)
    photos = Photo.query.filter(or_(Photo.title.like("%"+query.lower()+"%"),  Photo.description.like("%"+query.lower()+"%"))).all()
    print('photos', photos)
    if photos:
        return jsonify([photo.to_dict() for photo in photos])
    return jsonify([])
