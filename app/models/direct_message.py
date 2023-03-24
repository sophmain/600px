from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class DirectMessage(db.Model):
    __tablename__ = "direct_messages"

    if environment == 'production':
        __table_args__ = {"schema": SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")),nullable=False,)
    following_id = db.Column(db.Integer,db.ForeignKey(add_prefix_for_prod("users.id")),nullable=False)
    message = db.Column(db.String, nullable=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow, nullable=False)

    def to_dict(self):
        return {
            "id": self.id,
            "userId": self.user_id,
            "followingId": self.following_id,
            "message": self.message,
            "createdAt": str(self.created_at),
            "updatedAt": str(self.updated_at)
        }
