from flask_wtf import FlaskForm
from wtforms import StringField, BooleanField, IntegerField
from wtforms.validators import DataRequired, ValidationError
from app.models import Comment

def comment_length(form, field):
    comment = field.data
    if comment and len(comment) > 500:
        raise ValidationError('Comment type must be less than 500 characters.')



class CommentForm(FlaskForm):
    comment = StringField('comment', validators=[DataRequired(), comment_length])
