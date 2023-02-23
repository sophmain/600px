from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.orm import validates

class Gallery(db.Model):
    __tablename__ = 'galleries'

    if environment == 'production':
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    name = db.Column(db.String, nullable=False)
    description = db.Column(db.String)
    visible = db.Column(db.Boolean, nullable=False)

    user = db.relationship('User', back_populates='gallery')
    photo = db.relationship('Photo', back_populates='gallery')

    def to_dict(self):
        return {
            'id': self.id,
            'userId':self.user_id,
            'name': self.name,
            'description': self.description,
            'visible': self.visible,
            'userFirstName': self.user.first_name,
            'userLastName': self.user.last_name,
            'userProfImg': self.user.prof_photo_url
        }
