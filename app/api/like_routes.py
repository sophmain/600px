from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Like, db

like_routes = Blueprint('like', __name__)

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages

@like_routes.route('/')
def all_likes():

    all_likes = like.query.all()
    likes = [like.to_dict() for like in all_likes]

    return jsonify(likes)

@like_routes.route('/<int:id>', methods=['PUT'])
@login_required
def edit_like(id):
    found_like = like.query.get(id)
    res = request.get_json()

    form = likeForm()
    form["csrf_token"].data = request.cookies["csrf_token"]

    if form.validate_on_submit():

        found_like.like = res["like"]

        db.session.commit()
        res = found_like.to_dict()
        return jsonify(res)
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401

@like_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_like(id):
    selected_like = Like.query.get(id)

    if selected_like:
        db.session.delete(selected_like)
        db.session.commit()
        return selected_like.to_dict()
    else:
        return {'error':'Could not delete like'}
