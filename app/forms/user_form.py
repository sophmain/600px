from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, ValidationError
from app.models import User


def firstname_length(form, field):
    firstName = field.data
    if len(firstName) > 50 or len(firstName) < 1:
        raise ValidationError('First name must be between 1 and 50 characters.')

def lastname_length(form, field):
    lastName = field.data
    if len(lastName) > 50 or len(lastName) < 1:
        raise ValidationError('Last name must be between 1 and 50 characters.')

def city_length(form, field):
    city = field.data
    if city and len(city) > 50:
        raise ValidationError('City must be less than 50 characters.')

def country_length(form, field):
    country = field.data
    if country and len(country) > 50:
        raise ValidationError('Country must be less than 50 characters.')

def about_length(form, field):
    about = field.data
    if about and len(about) > 500:
        raise ValidationError('About must be less than 500 characters.')


class UserForm(FlaskForm):
    firstName = StringField('firstName', validators=[DataRequired(), firstname_length])
    lastName = StringField('lastName', validators=[DataRequired(), lastname_length])
    city = StringField('city', validators=[city_length])
    country = StringField('country', validators=[country_length])
    about = StringField('about', validators=[about_length])
