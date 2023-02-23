from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.orm import validates

class Upload(db.Model):
    __tablename__ = 'uploads'

    if environment == 'production':
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    upload_url = db.Column(db.String, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)

    photo = db.relationship('Photo', cascade="all, delete-orphan", back_populates='upload')

    def to_dict(self):
        return {
            'id': self.id,
            'uploadUrl': self.upload_url,
            'userId': self.user_id
        }
