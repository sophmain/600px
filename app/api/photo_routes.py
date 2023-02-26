from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Photo, Upload, db
from ..forms.post_form import PhotoForm
from app.awsupload import (
    upload_file_to_s3, allowed_file, get_unique_filename)

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

        photo_res.append({
            'id': photo['id'],
            'photoUrl': photo['photoUrl'],
            'photoFirstName': photo['uploadedFirstName'],
            'photoLastName': photo['uploadedLastName'],
            'title': photo['title'],
            'userId': photo['userId'],
            'category': photo['category'],
            'cameraType': photo['cameraType'],
            'lenseType': photo['lenseType'],
            'privacy': photo['privacy'],
            'description': photo['description'],
            'location': photo['location'],
            'takenDate': photo['takenDate']
        })

    return jsonify(photo_res)

@photo_routes.route('/upload', methods=['GET'])
def load_uploads():
    """
    Route to query for all uploaded photos
    """
    all_uploads = Upload.query.all()
    uploads = [upload.to_dict() for upload in all_uploads]

    upload_res = []
    for upload in uploads:

        upload_res.append({
            'id': upload['id'],
            'uploadUrl': upload['uploadUrl'],
            'userId': upload['userId']
        })

    return jsonify(upload_res)

@photo_routes.route('/upload', methods=['POST'])
@login_required
def upload_image():
    """
    Route to add an AWS S3 uploaded photo to the uploads table
    """
    if 'image' not in request.files:
        return {'errors': 'image required'}, 400

    image = request.files['image']

    if not allowed_file(image.filename):
        return {'errors': 'file type not permitted'}, 400

    image.filename = get_unique_filename(image.filename)
    upload = upload_file_to_s3(image)

    if 'url' not in upload:
        # if the dictionary doesn't have a url key
        # it means that there was an error when we tried to upload
        # so we send back that error message
        return upload, 400

    url = upload['url']

    # flask_login allows us to get the current user from the request
    new_image = Upload(user_id=current_user.id, upload_url=url)
    db.session.add(new_image)
    db.session.commit()
    return {'url': url}


@photo_routes.route('/', methods=['POST'])
def post_photo():
    """
    Route to post a photo with photo form data to the photos table
    """

    res = request.get_json()

    photo = PhotoForm()
    photo['csrf_token'].data = request.cookies['csrf_token']

    if photo.validate_on_submit():
        photo = Photo(
            user_id=res['userId'],
            upload_id=res['uploadId'],
            taken_date=res['takenDate'],
            category=res['category'],
            camera_type=res['cameraType'],
            lense_type=res['lenseType'],
            privacy=res['privacy'],
            title=res['title'],
            description=res['description'],
            location=res['location'],
        )
        db.session.add(photo)
        db.session.commit()
        return photo.to_dict()

    return {'errors': validation_errors_to_error_messages(photo.errors)}, 401

@photo_routes.route('/<int:id>')
def single_photo(id):
    """
    Route to query for single photo
    """
    single_photo = Photo.query.get(id)
    photo = single_photo.to_dict()
    return jsonify(photo)

@photo_routes.route('/<int:id>', methods=["PUT"])
def edit_photo(id):
    current_photo = Photo.query.get(id)

    res = request.get_json()
    print('>>>>>>>RES', res)
    photo = PhotoForm()
    print('photo......', photo.validate_on_submit())
    photo['csrf_token'].data = request.cookies['csrf_token']
    if photo.validate_on_submit():
        # photo.populate_obj(current_photo)

        current_photo.taken_date = res['takenDate']
        current_photo.category = res['category']
        current_photo.camera_type = res['cameraType']
        current_photo.lense_type = res['lenseType']
        current_photo.privacy = res['privacy']
        current_photo.title = res['title']
        current_photo.description = res['description']
        current_photo.location = res['location']
        # current_photo.gallery_id = res['galleryId']


        db.session.commit()
        photo = current_photo.to_dict()
        return jsonify(photo)
    return {'errors': validation_errors_to_error_messages(photo.errors)}, 401

@photo_routes.route('/<int:id>', methods=['DELETE'])
def delete_photo(id):
    current_photo = Photo.query.get(id)

    if current_photo:
        db.session.delete(current_photo)
        db.session.commit()
        return {'message':'Successfully deleted'}
    else:
        return {'error': 'Could not delete photo'}
