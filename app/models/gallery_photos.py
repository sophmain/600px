from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.ext.declarative import declarative_base



class GalleryPhotos(db.Model):
    __tablename__ = "galleries_photos"

    if environment == 'production':
        __table_args__ = {"schema": SCHEMA}
    id= db.Column(db.Integer, primary_key=True)
    gallery_id= db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("galleries.id")), nullable=False)
    photo_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("photos.id")), nullable=False)
