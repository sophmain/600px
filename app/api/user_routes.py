from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
from app.models import User, Follower, db
from ..forms.user_form import UserForm
from sqlalchemy import or_
from app.awsupload import (
    upload_file_to_s3, allowed_file, get_unique_filename)


user_routes = Blueprint('users', __name__)

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages

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

@user_routes.route('/<int:id>/uploadcover', methods=["PUT"])
def set_cover(id):

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

    current_user.cover_photo_url = url

    db.session.commit()
    user = current_user.to_dict()
    return jsonify(user)
    return {'errors': validation_errors_to_error_messages(user.errors)}, 401

@user_routes.route('/<int:id>/uploadprofile', methods=["PUT"])
def set_profile(id):

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

    current_user.prof_photo_url = url

    db.session.commit()
    user = current_user.to_dict()
    return jsonify(user)
    return {'errors': validation_errors_to_error_messages(user.errors)}, 401



@user_routes.route('/<int:id>/edit', methods=['PUT'])
def edit_user_info(id):
    current_user = User.query.get(id)
    res = request.get_json()
    user = UserForm()
    user['csrf_token'].data = request.cookies['csrf_token']

    if user.validate_on_submit():
        current_user.first_name = res['firstName']
        current_user.last_name = res['lastName']
        current_user.city = res['city']
        current_user.country = res['country']
        current_user.about = res['about']

        db.session.commit()
        user = current_user.to_dict()
        return jsonify(user)
    return {'errors': validation_errors_to_error_messages(user.errors)}, 401


@user_routes.route('/<int:id>/followers')
def get_followers(id):
    found_followers = Follower.query.filter(or_(Follower.user_id == id, Follower.follower_id == id)).all()
    followers = [found_follower.to_dict() for found_follower in found_followers]
    return jsonify(followers)

# @user_routes.route('/<int:id>/following')
# def get_following(id):
#     found_following = Follower.query.filter(Follower.follower_id == id).all()
#     following = [found_follower.to_dict() for found_follower in found_following]
#     return jsonify(following)
