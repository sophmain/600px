const POST_UPLOAD = 'upload/POST_UPLOAD'
const LOAD_ALLUPLOADS= 'upload/LOAD_SINGLEUPLOAD'

const postUpload = (upload) => ({
    type: POST_UPLOAD,
    upload
})

const actionLoadAllUploads = (uploads) => ({
    type: LOAD_ALLUPLOADS,
    uploads
})

export const thunkPostUpload = (upload) => async (dispatch) => {
    const response = await fetch(`/api/photos/upload`, {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(upload)
    })
    if (response.ok) {
        const newUpload = await response.json()
        dispatch(postUpload(newUpload))
        return newUpload;
    } else if (response.status < 500) {
        const newUpload = await response.json()
        if (newUpload.errors) {
			return newUpload.errors;
		}
    } else {
        return ["An error occurred. Please try again."];
    }
}

export const thunkLoadAllUploads = () => async (dispatch) => {
    const response = await fetch(`/api/photos/upload`)

    if (response.ok) {
        const photos = await response.json()
        dispatch(actionLoadAllUploads(photos))
        return photos
    }
}

const normalize = (arr) => {
    const resObj = {}
    arr.forEach((ele) => { resObj[ele.id] = ele })
    return resObj
}

const initialState = {}

const uploadReducer = (state = initialState, action) => {
    let newState
    switch (action.type) {
        case LOAD_ALLUPLOADS:
            newState = { ...state }
            newState.allUploads = normalize(action.uploads)
            return newState
        case POST_UPLOAD:
            newState = { ...state }
            newState = [action.upload.id] = action.upload
            return newState
        // case LOAD_SINGLEUPLOAD:
        //     newState = { ...state }
        //     newState.singleUpload = action.upload
        //     return newState
        default:
            return state
    }
}

export default uploadReducer
