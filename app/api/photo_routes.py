from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Photo, Upload, Comment, Like, db
from ..forms.post_form import PhotoForm
from ..forms.comment_form import CommentForm
from sqlalchemy import and_
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
            'takenDate': photo['takenDate'],
            'profilePhoto': photo['profilePhoto']
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
    photo = PhotoForm()
    photo['csrf_token'].data = request.cookies['csrf_token']

    if photo.validate_on_submit():

        current_photo.taken_date = res['takenDate']
        current_photo.category = res['category']
        current_photo.camera_type = res['cameraType']
        current_photo.lense_type = res['lenseType']
        current_photo.privacy = res['privacy']
        current_photo.title = res['title']
        current_photo.description = res['description']
        current_photo.location = res['location']

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


@photo_routes.route('/<int:id>/comments', methods=['GET'])
def all_comments(id):

    found_photo = Photo.query.get(id)

    all_comments = found_photo.comments
    comments = [comm.to_dict() for comm in all_comments]

    comment_res = []
    for comment in comments:

        comment_res.append({
            'id': comment['id'],
            'userId': comment['userId'],
            'photoId': comment['photoId'],
            'comment': comment['comment'],
            'createdAt': comment['createdAt'],
            'updatedAt': comment['updatedAt'],
            'userFirstName': comment['userFirstName'],
            'userLastName': comment['userLastName'],
            'userProfile': comment['userProfile']
        })

    return jsonify(comment_res)


@photo_routes.route('/<int:id>/comments', methods=['POST'])
@login_required
def post_comment(id):

    found_photo = Photo.query.get(id)
    res = request.get_json()
    form = CommentForm()
    form["csrf_token"].data = request.cookies["csrf_token"]

    if form.validate_on_submit():
        comment = Comment(
            photo_id=found_photo.id,
            user_id=current_user.id,
            comment=res['comment'],
        )

        db.session.add(comment)
        db.session.commit()
        return comment.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401

@photo_routes.route('/<int:id>/likes', methods=['GET'])
def all_likes(id):
    found_photo = Photo.query.get(id)

    all_likes = found_photo.likes
    likes = [like.to_dict() for like in all_likes]

    like_res = []
    for like in likes:

        like_res.append({
            'id': like['id'],
            'userId': like['userId'],
            'photoId': like['photoId'],
            'createdAt': like['createdAt'],
            'userFirstName': like['userFirstName'],
            'userLastName': like['userLastName'],
            'userProfile': like['userProfile']
        })

    return jsonify(like_res)

# @photo_routes.route('/<int:id>/likes/<int:userId>', methods=['GET'])
# def single_like(id):
#     found_like = Like.query.filter(and_(Like.photo_id == id, Like.user_id == current_user.id))
#     return found_like.to_dict()

@photo_routes.route('/<int:id>/likes', methods=['POST'])
@login_required
def post_like(id):

    found_photo = Photo.query.get(id)
    # res = request.get_json()
    # form = LikeForm()
    # form["csrf_token"].data = request.cookies["csrf_token"]

    like = Like(
        photo_id=found_photo.id,
        user_id=current_user.id,
    )

    db.session.add(like)
    db.session.commit()
    return like.to_dict()
