from .db import db, environment, SCHEMA
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from sqlalchemy.orm import validates
from .follower import Follower


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    if environment == 'production':
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(50), nullable=False)
    last_name = db.Column(db.String(50), nullable=False)
    email = db.Column(db.String(255), nullable=False, unique=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)
    city = db.Column(db.String(50))
    country = db.Column(db.String(50))
    about = db.Column(db.String(500))
    prof_photo_url = db.Column(db.String(500))
    cover_photo_url = db.Column(db.String(500))

    # profile = db.relationship('Profile', back_populates='user')
    gallery = db.relationship('Gallery', back_populates='user')
    photo = db.relationship('Photo', back_populates='user')
    comments = db.relationship('Comment', back_populates='user')
    likes = db.relationship('Like', back_populates='user')
    followers = db.relationship('Follower', back_populates='user', foreign_keys=[Follower.user_id])
    following = db.relationship('Follower', back_populates='follower', foreign_keys=[Follower.follower_id])


    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'firstName':self.first_name,
            'lastName': self.last_name,
            'username': self.username,
            'email': self.email,
            'city': self.city,
            'country': self.country,
            'about': self.about,
            'prof_photo_url': self.prof_photo_url,
            'cover_photo_url': self.cover_photo_url,

        }
