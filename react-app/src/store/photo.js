const LOAD_PHOTOS = 'photo/LOAD_PHOTOS'
const LOAD_SINGLEPHOTO = 'photo/LOAD_SINGLEPHOTO'
const POST_PHOTO = 'photo/POST_PHOTO'
const EDIT_PHOTO = 'photo/EDIT_PHOTO'
const DELETE_PHOTO = 'photo/DELETE_PHOTO'
//const GET_EDITPHOTO = 'photo/GET_EDITPHOTO'
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
    console.log('FROM THUNK')
    const response = await fetch(`/api/photos/${photoId}`)

    if (response.ok) {
        const photo = await response.json()
        dispatch(actionLoadSinglePhoto(photo))
        //dispatch(actionPhotoToEdit(photo))
        return photo
    }
}
export const thunkPostPhoto = (payload) => async (dispatch) => {
    console.log('PAYLOADDDDD', payload)
    const response = await fetch('/api/photos/', {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    })
    console.log('RESPONSE FROM INSIDE THUNK', response)
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
    console.log('RESPONSE IN THUNK', response)
    if (response.ok) {
        const deleteMessage = await response.json()
        console.log('DELETE MESSAGE', deleteMessage)
        dispatch(actionDeletePhoto(photoToDelete.id))
        return photoToDelete
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
        // case GET_EDITPHOTO:
        //     newState = { ...state }
        //     newState.photoToEdit = action.photo
        //     return newState
        case DELETE_PHOTO:
            newState = { ...state }
            delete newState.allPhotos[action.toDelete.id]
            newState.allPhotos = { ...newState.allPhotos }
            return newState
        default:
            return state
    }

}

export default photoReducer
