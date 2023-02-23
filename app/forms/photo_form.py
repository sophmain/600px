from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField
from wtforms.validators import DataRequired, ValidationError



class PhotoForm(FlaskForm):
    taken_date = StringField('takenDate')
    # photo_url = StringField('photoUrl', validators=[DataRequired(), images_url_valid])
    category = StringField('category', validators=[DataRequired()])
    camera_type = StringField('cameraType')
    lense_type = StringField('lenseType')
    privacy = StringField('privacy', validators=[DataRequired()])
    title = StringField('title')
    description = TextAreaField('description')
    location = StringField('location')
