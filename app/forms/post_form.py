from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, ValidationError
from app.models import Photo
from datetime import date, datetime

def date_in_past(form, field):
    takenDate = field.data
    today_date = datetime.today()
    if datetime.strptime(takenDate, '%Y-%m-%d') > today_date:
        raise ValidationError('Date must be in the past')

def cameratype_length(form, field):
    cameraType = field.data
    if len(cameraType) > 50:
        raise ValidationError('Camera type must be less than 50 characters.')

def lensetype_length(form, field):
    lenseType = field.data
    if len(lenseType) > 50:
        raise ValidationError('Lense type must be less than 50 characters.')

def title_length(form, field):
    title = field.data
    if len(title) > 100 or len(title) < 1:
        raise ValidationError('Title must be between 1 and 100 characters.')

def description_length(form, field):
    description = field.data
    if len(description) > 1000:
        raise ValidationError('Description must be less than 1000 characters.')

def location_length(form, field):
    location = field.data
    if len(location) > 50:
        raise ValidationError("Location must be less than 50 characters.")

class PhotoForm(FlaskForm):
    takenDate = StringField('takenDate', validators=[date_in_past])
    category = StringField('category', validators=[DataRequired()])
    cameraType = StringField('cameraType', validators=[cameratype_length])
    lenseType = StringField('lenseType', validators=[lensetype_length])
    privacy = StringField('privacy', validators=[DataRequired()])
    title = StringField('title', validators=[DataRequired(), title_length])
    description = StringField('description', validators=[description_length])
    location = StringField('location', validators=[location_length])
