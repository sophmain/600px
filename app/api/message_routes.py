from flask import Blueprint, request, jsonify
from sqlalchemy import or_, and_
from flask_login import current_user, login_required
from app.models import DirectMessage, db, User
from datetime import datetime
from flask_socketio import emit

message_routes = Blueprint("direct_messages", __name__)

# get all user messages
@message_routes.route("/<int:id>")
@login_required
def get_messages(id):
    messages = (
        DirectMessage.query.filter(
            or_(
                and_(
                    DirectMessage.user_id == current_user.id,
                    DirectMessage.following_id == id,
                ),
                and_(
                    DirectMessage.user_id == id,
                    DirectMessage.following_id == current_user.id,
                ),
            )
        )
        .order_by(DirectMessage.created_at.asc())
        .all()
    )
    all_messages = [message.to_dict() for message in messages]
    return jsonify(all_messages)

# get all user messages
@message_routes.route("/")
@login_required
def get_conversations():
    messages = (
        DirectMessage.query.filter(
            or_(
                DirectMessage.user_id == current_user.id,
                DirectMessage.following_id == current_user.id,
                ),
            )
        .order_by(DirectMessage.created_at.asc())
        .all()
    )
    all_messages = [message.to_dict() for message in messages]
    return jsonify(all_messages)


#delete message by message id
@message_routes.route("/<int:id>", methods=["DELETE"])
@login_required
def delete_dm(id):
    data = DirectMessage.query.get(id)
    if data:
        db.session.delete(data)
        db.session.commit()
        # emit('message_deleted', {'messageId': id}, broadcast=True)
        return {'message': 'Successfully deleted'}
    else:
        return {'error': 'Could not delete message'}
