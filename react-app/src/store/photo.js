const LOAD_PHOTOS = 'photo/LOAD_PHOTOS'
const LOAD_SINGLEPHOTO = 'photo/LOAD_SINGLEPHOTO'
const CLEAN_UP_PHOTO = 'photo/CLEAN_UP_PHOTO'

const actionLoadPhotos = (photos) => ({
    type: LOAD_PHOTOS,
    photos
})

const actionLoadSinglePhoto = (photo) => ({
    type: LOAD_SINGLEPHOTO,
    photo
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
        return photo
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
        default:
            return state
    }

}

export default photoReducer
