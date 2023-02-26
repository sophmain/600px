from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.orm import validates
from .gallery_photos import gallery_photos


class Gallery(db.Model):
    __tablename__ = 'galleries'

    if environment == 'production':
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    title = db.Column(db.String(100), nullable=False)
    description = db.Column(db.String(1000))
    visible = db.Column(db.Boolean, nullable=False)
    preview_image_id = db.Column(db.Integer)

    user = db.relationship('User', back_populates='gallery')
    photo = db.relationship('Photo', secondary=gallery_photos, back_populates='gallery')

    def to_dict(self):
        return {
            'id': self.id,
            'userId':self.user_id,
            'title': self.title,
            'description': self.description,
            'visible': self.visible,
            'userFirstName': self.user.first_name,
            'userLastName': self.user.last_name,
            'previewImage': self.preview_image_id
            # 'galleryPreviewPhoto': self.photo.id
            # 'userProfImg': self.user.prof_photo_url
        }
