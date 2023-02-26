from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.ext.declarative import declarative_base



gallery_photos = db.Table(
    "galleries_photos",
    db.Column("gallery_id", db.ForeignKey(add_prefix_for_prod("galleries.id")), primary_key=True),
    db.Column("photo_id", db.ForeignKey(add_prefix_for_prod("photos.id")), primary_key=True)
)
if environment == 'production':
    gallery_photos.schema = SCHEMA
