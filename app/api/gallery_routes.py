from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Model

gallery_routes = Blueprint('gallery', __name__)

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages

@gallery_routes.route('/', methods=['GET'])
def all_galleries():
    """
    Route to query for all galleries
    """
    all_galleries = Gallery.query.all()
    galleries = [gallery.to_dict() for gallery in all_galleries]
    gallery_res = []
    for gallery in galleries:
        gallery_res.append({
            'id': gallery['id'],
            'name': gallery['name'],
            'description': gallery['description'],
            'visible': gallery['visible'],
            'userFirstName': gallery['userFirstName'],
            'userLastName': gallery['userLastName']
        })

    return jsonify(photo_res)

@gallery_routes.route('/<int:id>')
def single_gallery(id):
    """
    Route to query for single gallery
    """
    single_gallery = Gallery.query.get(id)
    gallery = single_gallery.to_dict()
    return jsonify(gallery)

@gallery_routes.route('/', methods=['POST'])
def create_gallery():
    """
    Route to add created gallery to galleries table
    """
    res = request.get_json()
    gallery = GalleryForm()
    gallery["csrf_token"].data = request.cookies["csrf_token"]

    if gallery.validate_on_submit():
        gallery = Gallery(
            user_id = res['userId'],
            name = res['name'],
            description = res['description'],
            visible = res['visible']
        )
        db.session.add(gallery)
        db.session.commit()
        return gallery.to_dict()

    return {'errors': validation_errors_to_error_messages(gallery.errors)}, 401
