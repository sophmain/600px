from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.orm import validates
from datetime import datetime

class Photo(db.Model):
    __tablename__ = 'photos'

    if environment == 'production':
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    gallery_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('galleries.id')))
    upload_date = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)
    taken_date = db.Column(db.DateTime, default=datetime.utcnow)
    photo_url = db.Column(db.String(500), nullable=False)
    category = db.Column(db.String(50), nullable=False)
    camera_type = db.Column(db.String(50))
    lense_type = db.Column(db.String(100))
    privacy = db.Column(db.String(100)) # options handled in front end form
    title = db.Column(db.String(500))
    description = db.Column(db.String(500))
    location = db.Column(db.String(100))

    user = db.relationship('User', back_populates='photo')
    gallery = db.relationship('Gallery', back_populates='photo')

    def to_dict(self):
        return {
            'id': self.id,
            'userId':self.user_id,
            'galleryId': self.gallery_id,
            'uploadDate': self.upload_date,
            'takenDate': self.taken_date,
            'photoUrl': self.photo_url,
            'category': self.category,
            'cameraType': self.camera_type,
            'lenseType': self.lense_type,
            'privacy': self.privacy,
            'title': self.title,
            'description': self.description,
            'location': self.location,
            'uploadedFirstName': self.user.first_name,
            'uploadedLastName': self.user.last_name
        }
