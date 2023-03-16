from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Follower, db

follow_routes = Blueprint('follow', __name__)

@follow_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def unfollow_user(id):
    selected_follow = Follower.query.get(id)
    if selected_follow:
        db.session.delete(selected_follow)
        db.session.commit()
        return selected_follow.to_dict()
    else:
        return {'error':'Could not unfollow'}
