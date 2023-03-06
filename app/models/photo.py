from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.orm import validates
from datetime import datetime
from .gallery_photos import GalleryPhotos

class Photo(db.Model):
    __tablename__ = 'photos'

    if environment == 'production':
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    # gallery_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('galleries.id')))
    upload_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('uploads.id')), nullable=False)
    upload_date = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)
    taken_date = db.Column(db.String)
    category = db.Column(db.String(100), nullable=False)
    camera_type = db.Column(db.String(100))
    lense_type = db.Column(db.String(100))
    privacy = db.Column(db.String(100)) # options handled in front end form
    title = db.Column(db.String(100))
    description = db.Column(db.String(1000))
    location = db.Column(db.String(100))

    user = db.relationship('User', back_populates='photo')
    galleryphoto = db.relationship('GalleryPhotos', back_populates='photo', cascade="all, delete-orphan")
    comments = db.relationship('Comment', cascade="all, delete-orphan", back_populates='photo')
    likes = db.relationship('Like', cascade="all, delete-orphan", back_populates='photo')
    # gallery = db.relationship('Gallery', secondary=gallery_photos, back_populates='photo')
    upload = db.relationship('Upload', cascade="all, delete-orphan", single_parent=True, uselist=False, back_populates='photo')

    if environment == "production":
        __table_args__ = {"schema": SCHEMA}

        gallery = db.relationship('Gallery', secondary=f"{SCHEMA}.galleries_photos")
    else:
        gallery = db.relationship('Gallery', secondary="galleries_photos")

    def to_dict(self):
        return {
            'id': self.id,
            'userId':self.user_id,
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
            'uploadedLastName': self.user.last_name,
            'profilePhoto': self.user.prof_photo_url
        }
