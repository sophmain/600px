const LOAD_PHOTOS = 'photo/LOAD_PHOTOS'
const LOAD_SINGLEPHOTO = 'photo/LOAD_SINGLEPHOTO'
const POST_PHOTO = 'photo/POST_PHOTO'
const EDIT_PHOTO = 'photo/EDIT_PHOTO'
const DELETE_PHOTO = 'photo/DELETE_PHOTO'
const POST_GALLERYPHOTO = 'photo/POST_GALLERYPHOTO'
const DELETE_GALLERYPHOTO = 'photo/DELETE_GALLERYPHOTO'
const GET_GALLERYPHOTO = 'photo/GET_GALLERYPHOTO'
// const GET_EDITPHOTO = 'photo/GET_EDITPHOTO'
const CLEAN_UP_PHOTO = 'photo/CLEAN_UP_PHOTO'

const actionLoadPhotos = (photos) => ({
    type: LOAD_PHOTOS,
    photos
})

const actionLoadSinglePhoto = (photo) => ({
    type: LOAD_SINGLEPHOTO,
    photo
})

const actionPostPhoto = (newphoto) => ({
    type: POST_PHOTO,
    newphoto
})

const actionEditPhoto = (updatedPhoto) => ({
    type: EDIT_PHOTO,
    updatedPhoto
})
// const actionPhotoToEdit = (photo) => ({
//     type:GET_EDITPHOTO,
//     photo
// })

const actionDeletePhoto = (toDelete) => ({
    type: DELETE_PHOTO,
    toDelete
})

const actionDeleteGalleryPhoto = (toDelete) => ({
    type: DELETE_GALLERYPHOTO,
    toDelete
})

const actionCreatePostGallery = (photoIds) => {
    return {
        type: POST_GALLERYPHOTO,
        photoIds
    }
};

export const actionGetGalleryPhotos = (photos) => ({
    type: GET_GALLERYPHOTO,
    photos

})

export const actionCleanUpPhoto = () => {
    return {
        type: CLEAN_UP_PHOTO
    }
}

export const thunkLoadPhotos = () => async (dispatch) => {
    const response = await fetch('/api/photos/')

    if (response.ok) {
        const photos = await response.json()
        dispatch(actionLoadPhotos(photos))
        return photos
    }
}

export const thunkLoadSinglePhoto = (photoId) => async (dispatch) => {
    const response = await fetch(`/api/photos/${photoId}`)
    if (response.ok) {
        const photo = await response.json()

        dispatch(actionLoadSinglePhoto(photo))
        //dispatch(actionPhotoToEdit(photo))
        return photo
    }
}
export const thunkPostPhoto = (payload) => async (dispatch) => {

    const response = await fetch('/api/photos/', {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    })

    if (response.ok) {
        const newPhoto = await response.json()
        dispatch(actionPostPhoto(newPhoto))
        return newPhoto;
    } else if (response.status < 500) {
        const newPhoto = await response.json()
        if (newPhoto.errors) {
            return newPhoto.errors;
        }
    } else {
        return ["An error occurred. Please try again."];
    }
}

export const thunkEditPhoto = (updatedPhoto) => async (dispatch) => {

    const response = await fetch(`/api/photos/${updatedPhoto.id}`, {
        method: "PUT",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedPhoto)
    })

    if (response.ok) {
        const updatedPhoto = await response.json()
        dispatch(actionEditPhoto(updatedPhoto))
        return updatedPhoto;

    } else if (response.status < 500) {
        const updatedPhoto = await response.json()
        if (updatedPhoto.errors) {
            return updatedPhoto.errors;
        }
    } else {
        return ["An error occurred. Please try again."];
    }

}
export const thunkDeletePhoto = (photoToDelete) => async (dispatch) => {
    const response = await fetch(`/api/photos/${photoToDelete.id}`, {
        method: "DELETE"
    })
    console.log('response', response)
    if (response.ok) {
        await response.json()
        dispatch(actionDeletePhoto(photoToDelete.id))
        return photoToDelete
    }
}

export const thunkPostPhotoGallery = (galleryId, photoIds) => async dispatch => {

    const response = await fetch(`/api/galleries/${galleryId}/photos`, {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(photoIds),
    });

    if (response.ok) {
        const photoIds = await response.json()
        dispatch(actionCreatePostGallery(photoIds))
        return photoIds
    }

};
export const thunkDeleteGalleryPhoto = (deleteId, galleryId) => async (dispatch) => {
    const response = await fetch(`/api/galleries/${galleryId}/${deleteId}`, {
        method: "DELETE"
    })

    if (response.ok) {
        await response.json()
        dispatch(actionDeleteGalleryPhoto(deleteId))
        return deleteId
    }
}
export const thunkGetGalleryPhotos = (galleryId) => async (dispatch) => {
    const response = await fetch(`/api/galleries/${galleryId}/get`)
    if (response.ok) {
        const photos = await response.json()
        dispatch(actionGetGalleryPhotos(photos))
        return photos
    }
}

const normalize = (arr) => {

    const resObj = {}
    arr.forEach((ele) => { resObj[ele.id] = ele })
    return resObj
}

const initialState = {}

const photoReducer = (state = initialState, action) => {
    let newState
    switch (action.type) {
        case LOAD_PHOTOS:
            newState = { ...state }
            newState.allPhotos = normalize(action.photos)
            return newState
        case LOAD_SINGLEPHOTO:
            newState = { ...state }
            newState.singlePhoto = action.photo
            return newState
        case CLEAN_UP_PHOTO:
            newState = { ...initialState }
            return newState
        case POST_PHOTO:
            newState = { ...state }
            newState.allPhotos = { ...newState.allPhotos, [action.newphoto.id]: action.newphoto }
            newState.singlePhoto = { ...newState.singlePhoto, ...action.newphoto }
            return newState
        case EDIT_PHOTO:
            newState = { ...state }
            newState.allPhotos = { ...newState.allPhotos, [action.updatedPhoto.id]: action.updatedPhoto }
            newState.singlePhoto = { ...newState.singlePhoto, ...action.updatedPhoto }
            return newState
        case DELETE_PHOTO:
            newState = { ...state }
            delete newState.allPhotos[action.toDelete.id]
            newState.singlePhoto = { ...state }
            // const { [action.toDelete.id]: deletedPhoto, ...remainingPhotos } = state.allPhotos;
            // return {
            //   ...newState,
            //   allPhotos: remainingPhotos,
            //   photoDetails: state.photoDetails.filter(photo => photo.id !== action.toDelete.id),
            // };
            return newState
        case POST_GALLERYPHOTO:
            newState = { ...state }
            action.photoIds.forEach((photo) => {
                newState.galleryPhotos = { ...newState.galleryPhotos, [photo]: photo }
            })
            return newState
        case DELETE_GALLERYPHOTO:
            newState = { ...state }
            newState.galleryPhotos = { ...newState.galleryPhotos }
            delete newState.galleryPhotos[action.toDelete]
            return newState
        case GET_GALLERYPHOTO:
            newState = { ...state }
            newState.galleryPhotos = { ...newState.galleryPhotos }
            action.photos.forEach((photo) => {
                newState.galleryPhotos = { ...newState.galleryPhotos, [photo.photoId]: photo.photoUrl }
            })
            return newState
        default:
            return state
    }

}

export default photoReducer
