from flask_wtf import FlaskForm
from wtforms import StringField, BooleanField, IntegerField
from wtforms.validators import DataRequired, ValidationError
from app.models import Gallery


def title_length(form, field):
    title = field.data
    if len(title) > 100 or len(title) < 1:
        raise ValidationError('Title must be between 1 and 100 characters.')

def description_length(form, field):
    description = field.data
    if description and len(description) > 1000:
        raise ValidationError('Description must be less than 1000 characters.')


class GalleryForm(FlaskForm):
    title = StringField('title', validators=[DataRequired(), title_length])
    description = StringField('description', validators=[description_length])
    visible = BooleanField('visible')
    preview_image_id = IntegerField('previewImage')
