from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.orm import validates


class Profile(db.Model):
    __tablename__ = 'profiles'

    if environment == 'production':
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    city = db.Column(db.String(50))
    country = db.Column(db.String(50))
    about = db.Column(db.String(500))
    prof_photo_url = db.Column(db.String(500))
    cover_photo_url = db.Column(db.String(500))

    user = db.relationship('User', back_populates='profile')


    def to_dict(self):
        return {
            'id': self.id,
            'userId':self.user_id,
            'city': self.city,
            'country': self.country,
            'about': self.about,
            'prof_photo_url': self.prof_photo_url,
            'cover_photo_url': self.cover_photo_url,
            'username': self.users.username
        }
