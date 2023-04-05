from flask_socketio import SocketIO, emit
from .models import db, DirectMessage
import os, json

# configure cors_allowed_origins
if os.environ.get("FLASK_ENV") == "production":
    origins = [
        'http://sixhundredpx.onrender.com',
        'https://sixhundredpx.onrender.com'
    ]
else:
    origins = "*"

# initialize socket instance
socketio = SocketIO(cors_allowed_origins=origins)

# handle direct messages
@socketio.on("chat")
def handle_message(data):
    if data != "User connected!":
        message = DirectMessage(
            user_id= data["user_id"],
            message= data["message"],
            following_id= data["following_id"]
        )
        db.session.add(message)
        db.session.commit()
        chat = message.to_dict()
    emit("chat", chat, broadcast=True)


@socketio.on("delete")
def handle_delete(messageId):
    message = DirectMessage.query.get(messageId)
    if message:
        db.session.delete(message)
        db.session.commit()
        emit("delete", messageId, broadcast=True)
