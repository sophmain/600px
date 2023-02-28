from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Comment, db

comment_routes = Blueprint('comment', __name__)

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages

@comment_routes.route('/')
def all_comments():

    all_comm = Comment.query.all()
    comments = [comment.to_dict() for comment in all_comm]

    return jsonify(comments)

@comment_routes.route('/<int:id>', methods=['PUT'])
@login_required
def edit_comment(id):
    found_comment = Comment.query.get(id)
    res = request.get_json()

    form = CommentForm()
    form["csrf_token"].data = request.cookies["csrf_token"]

    if form.validate_on_submit():

        found_comment.comment = res["comment"]

        db.session.commit()
        res = found_comment.to_dict()
        return jsonify(res)
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401

@comment_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_comment(id):
    selected_comment = Comment.query.get(id)

    if selected_comment:
        db.session.delete(selected_comment)
        db.session.commit()
        return selected_comment.to_dict()
    else:
        return {'error':'Could not delete comment'}
