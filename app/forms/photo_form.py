from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField, DateField
from wtforms.validators import DataRequired, ValidationError


def images_url_valid(form, field):
    imageUrl = field.data
    if not imageUrl.includes(('.png', '.jpg', '.gif')):
        raise ValidationError('URL does not contain an image.')


class PhotoForm(FlaskForm):
    taken_date = DateField('takenDate')
    photo_url = StringField('photoUrl', validators=[DataRequired(), images_url_valid])
    category = StringField('category', validators=[DataRequired()])
    camera_type = StringField('cameraType')
    lense_type = StringField('lenseType')
    privacy = StringField('privacy', DataRequired())
    title = StringField('title')
    description = TextAreaField('description')
    location = StringField('location')
