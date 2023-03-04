from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.orm import validates
from datetime import datetime


class Like(db.Model):
    __tablename__ = 'likes'

    if environment == 'production':
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')))
    photo_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('photos.id')))
    created_at = db.Column(db.DateTime, default=datetime.utcnow,  nullable=False)

    user = db.relationship('User', back_populates='likes')
    photo = db.relationship('Photo', back_populates='likes')

    def to_dict(self):
        return {
            'id': self.id,
            'userId': self.user_id,
            'photoId': self.photo_id,
            'createdAt': self.created_at,
            'userFirstName': self.user.first_name,
            'userLastName': self.user.last_name,
            'userProfile': self.user.prof_photo_url,
            # 'photoUrl': self.photo.upload.upload_url
        }
