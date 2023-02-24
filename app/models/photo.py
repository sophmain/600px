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
    upload_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('uploads.id')), nullable=False)
    upload_date = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)
    taken_date = db.Column(db.String(50))
    # photo_url = db.Column(db.String(500), nullable=False)
    category = db.Column(db.String(50), nullable=False)
    camera_type = db.Column(db.String(50))
    lense_type = db.Column(db.String(50))
    privacy = db.Column(db.String(100)) # options handled in front end form
    title = db.Column(db.String(100))
    description = db.Column(db.String(1000))
    location = db.Column(db.String(50))

    user = db.relationship('User', back_populates='photo')
    gallery = db.relationship('Gallery', back_populates='photo')
    upload = db.relationship('Upload', cascade="all, delete-orphan", single_parent=True, uselist=False, back_populates='photo')

    def to_dict(self):
        return {
            'id': self.id,
            'userId':self.user_id,
            'galleryId': self.gallery_id,
            'uploadId': self.upload_id,
            'photoUrl': self.upload.upload_url,
            'uploadDate': self.upload_date,
            'takenDate': self.taken_date,
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
