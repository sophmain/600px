from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Gallery, db, GalleryPhotos
from ..forms.gallery_form import GalleryForm
from ..forms.post_form import PhotoForm

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
    # print('>>>>>>>>>>all galleries', all_galleries[0])
    galleries = [gallery.to_dict() for gallery in all_galleries]
    gallery_res = []
    # print('galleries', galleries)
    for gallery in galleries:
        # print('GALLERY PHOTO', gallery.photo)

        gallery_res.append({
            'id': gallery['id'],
            'title': gallery['title'],
            'description': gallery['description'],
            'visible': gallery['visible'],
            'userFirstName': gallery['userFirstName'],
            'userLastName': gallery['userLastName'],
            'previewImage': gallery['previewImage'],
            'photos': gallery['photos'],
            'userId': gallery['userId'],
            'userProf': gallery['userProf']
            # 'galleryPreviewPhoto': gallery['galleryPreviewPhoto']
        })

    return jsonify(gallery_res)

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
    print('>>>>>>>.res', res)
    gallery = GalleryForm()
    gallery['csrf_token'].data = request.cookies['csrf_token']

    if gallery.validate_on_submit():
        gallery = Gallery(
            user_id = res['userId'],
            title = res['title'],
            description = res['description'],
            visible = res['visible'],
            # photos = res['photos']
            # preview_image_id = res['previewImage']
        )
        # gallery.photos.add(photo)
        db.session.add(gallery)
        db.session.commit()
        return gallery.to_dict()

    return {'errors': validation_errors_to_error_messages(gallery.errors)}, 401

@gallery_routes.route('/<int:id>', methods=['PUT'])
def edit_gallery(id):
    current_gallery = Gallery.query.get(id)

    res = request.get_json()
    gallery = GalleryForm()
    gallery['csrf_token'].data = request.cookies['csrf_token']
    if gallery.validate_on_submit():
        # gallery.populate_obj(current_gallery)
        current_gallery.title = res['title']
        current_gallery.description = res['description']
        current_gallery.visible = res['visible']

        db.session.commit()
        gallery = current_gallery.to_dict()
        return jsonify(gallery)
    return {'errors': validation_errors_to_error_messages(gallery.errors)}, 401

@gallery_routes.route('/<int:id>', methods=['DELETE'])
def delete_gallery(id):
    current_gallery = Gallery.query.get(id)

    if current_gallery:
        db.session.delete(current_gallery)
        db.session.commit()
        return {'message': 'Successfully deleted'}
    else:
        return {'error': 'Could not delete photo'}

@gallery_routes.route('/<int:id>/photos', methods=['POST'])
def create_post(id):
    """
    Route to add photos to gallery
    """
    gallery = Gallery.query.get(id)
    res = request.get_json()
    for photoId in res:
        new_gallery_photo = GalleryPhotos(
            photo_id = photoId,
            gallery_id = id
        )
        db.session.add(new_gallery_photo)
        db.session.commit()
    return jsonify(res)

# @gallery_routes.route('/<int:id>/photos')
# def all_gallery_photos(id):
#     """
#     Route to query for all photos
#     """
#     gallery = Gallery.query.get(id)
#     all_gallery_photos = Photo.query.all()
#     photos = [photo.to_dict() for photo in all_gallery_photos if photo in gallery.photos]

#     photo_res = []
#     for photo in photos:

#         photo_res.append({
#             'id': photo['id'],
#             'photoUrl': photo['photoUrl'],
#             'photoFirstName': photo['uploadedFirstName'],
#             'photoLastName': photo['uploadedLastName'],
#             'title': photo['title'],
#             'userId': photo['userId'],
#             'category': photo['category'],
#             'cameraType': photo['cameraType'],
#             'lenseType': photo['lenseType'],
#             'privacy': photo['privacy'],
#             'description': photo['description'],
#             'location': photo['location'],
#             'takenDate': photo['takenDate']
#         })

#     return jsonify(photo_res)
