from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import Photo
from ..forms import PhotoForm

photo_routes = Blueprint('photo', __name__)


def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages

@photo_routes.route('/')
def all_photos():
    """
    Route to query for all photos
    """

    all_photos = Photo.query.all()
    photos = [photo.to_dict() for photo in all_photos]

    photo_res = []
    for photo in photos:
        print('photo', photo)
        photo_res.append({
            'id': photo['id'],
            'photoUrl': photo['photoUrl']
        })

    return jsonify(photo_res)

@photo_routes.route('/', methods=['POST'])
def post_photo():
    res = request.get_json()
    print('res from post photo route', res)
    photo = PhotoForm()
    photo["csrf_token"].data = request.cookies["csrf_token"]

    if photo.validate_on_submit():
        photo = Photo(
            user_id=res["userId"],
            taken_date=res["takenDate"],
            category=res["category"],
            camera_type=res["cameraType"]
            lense_type=res["lenseType"]
            privacy=res["privacy"]
            title=res["title"]
            description=res["description"]
            location=res["location"]
        )
        db.session.add(photo)
        db.session.commit()
        return photo.to_dict()

    return {'errors': validation_errors_to_error_messages(photo.errors)}, 401

@photo_routes.route('/<int:id>')
def single_photo(id):
    single_photo = Photo.query.get(id)
    photo = single_photo.to_dict()
    return jsonify(photo)

@photo_routes.route('/<int:id>', methods=["PUT"])
def edit_photo(id):
    current_photo = Photo.query.get(id)

    res = request.get_json()
    photo = PhotoForm()
    photo["csrf_token"].data = request.cookies["csrf_token"]
    if photo.validate_on_submit():
        photo.populate_obj(current_photo)

        current_photo.taken_date = res["takenDate"]
        current_photo.category = res["category"]
        current_photo.camera_type = res["cameraType"]
        current_photo.lense_type = res["lenseType"]
        current_photo.privacy = res["privacy"]
        current_photo.title = res["title"]
        current_photo.description = res["description"]
        current_photo.location = res["location"]

        db.session.commit()
        photo = current_photo.to_dict()
        return jsonify(photo)
    return {'errors': validation_errors_to_error_messages(photo.errors)}, 401

@photo_routes.route('/<int:id>', methods=["DELETE"])
def delete_photo(id):
    current_photo = Photo.query.get(id)

    if current_photo:
        db.session.delete(current_photo)
        db.session.commit()
    else:
        return {'error': 'Coult not delete photo'}
