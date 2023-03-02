from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
from app.models import User, db
from app.awsupload import (
    upload_file_to_s3, allowed_file, get_unique_filename)


user_routes = Blueprint('users', __name__)


@user_routes.route('/')
# @login_required
def users():
    """
    Query for all users and returns them in a list of user dictionaries
    """
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}


@user_routes.route('/<int:id>')
# @login_required
def user(id):
    """
    Query for a user by id and returns that user in a dictionary
    """
    user = User.query.get(id)
    return user.to_dict()

@user_routes.route('/<int:id>')
def single_user(id):
    found_user = User.query.get(id)
    user = found_user.to_dict()
    return jsonify(user)

@user_routes.route('/<int:id>/upload', methods=["PUT"])
def set_cover(id):
    print('>>>>> in user cover route')
    if 'image' not in request.files:
        return {'errors': 'image required'}, 400

    image = request.files['image']
    print('>>>>>>> image', image)

    if not allowed_file(image.filename):
        return {'errors': 'file type not permitted'}, 400

    image.filename = get_unique_filename(image.filename)
    upload = upload_file_to_s3(image)
    print('>>>>>>>> UPLOADDDD', upload)
    if 'url' not in upload:
        # if the dictionary doesn't have a url key
        # it means that there was an error when we tried to upload
        # so we send back that error message
        return upload, 400

    url = upload['url']

    current_user.cover_photo_url = url

    db.session.commit()
    user = current_user.to_dict()
    return jsonify(user)
    return {'errors': validation_errors_to_error_messages(user.errors)}, 401
