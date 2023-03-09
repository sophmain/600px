from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.orm import validates



class Follower(db.Model):
    __tablename__ = 'followers'

    if environment == 'production':
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')))
    follower_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')))

    user = db.relationship('User', back_populates='followers', foreign_keys=[user_id])
    # follower = db.relationship('User', )


    def to_dict(self):
        return {
            'id': self.id,
            'userId': self.user_id,
            'followerId': self.follower_id
        }
