const LOAD_GALLERIES = 'gallery/LOAD_GALLERIES'
const LOAD_SINGLEGALLERY = 'gallery/LOAD_SINGLEGALLERY'
const CREATE_GALLERY = 'gallery/CREATE_GALLERY'
const EDIT_GALLERY = 'gallery/EDIT_GALLERY'
const DELETE_GALLERY = 'gallery/DELETE_GALLERY'


const actionLoadGalleries = (galleries) => ({
    type: LOAD_GALLERIES,
    galleries
})

const actionLoadSingleGallery = (gallery) => ({
    type: LOAD_SINGLEGALLERY,
    gallery
})
const actionCreateGallery = (newGallery) => ({
    type: CREATE_GALLERY,
    newGallery
})
const actionEditGallery = (editedGallery) => ({
    type: EDIT_GALLERY,
    editedGallery
})

const actionDeleteGallery = (toDelete) => ({
    type: DELETE_GALLERY,
    toDelete
})
// const actionDeleteGalleryPhoto = (toDelete) => ({
//     type: DELETE_GALLERYPHOTO,
//     toDelete
// })


export const thunkLoadGalleries = () => async (dispatch) => {
    const response = await fetch('/api/galleries/')
    if (response.ok) {
        const galleries = await response.json()
        dispatch(actionLoadGalleries(galleries))
        return galleries
    }
}
export const thunkLoadSingleGallery = (galleryId) => async (dispatch) => {

    const response = await fetch(`/api/galleries/${galleryId}`)
    if (response.ok){
        const gallery = await response.json()
        dispatch(actionLoadSingleGallery(gallery))
        return gallery
    }
}
export const thunkCreateGallery = (payload) => async (dispatch) => {
    const response = await fetch('/api/galleries/', {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    })
    if (response.ok) {
        const newGallery = await response.json()
        dispatch(actionCreateGallery(newGallery))
        return newGallery
    } else if (response.status < 500) {
        const newGallery = await response.json()
        if (newGallery.errors) {
			return newGallery.errors;
		}
    } else {
        return ["An error occurred. Please try again."];
    }
}

export const thunkEditGallery = (editedGallery) => async (dispatch) => {

    const response = await fetch(`/api/galleries/${editedGallery.id}`, {
        method: "PUT",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editedGallery)
    })

    if (response.ok) {
        const editedGallery = await response.json()
        dispatch(actionEditGallery(editedGallery))
        return editedGallery;

    } else if (response.status < 500) {
        const editedGallery = await response.json()

        if (editedGallery.errors) {
            return editedGallery.errors;
		}
    } else {
        return ["An error occurred. Please try again."];
    }

}

export const thunkDeleteGallery = (galleryToDelete) => async (dispatch) => {
    const response = await fetch(`/api/galleries/${galleryToDelete.id}`, {
        method: "DELETE"
    })

    if (response.ok) {
        await response.json()
        dispatch(actionDeleteGallery(galleryToDelete.id))
        return galleryToDelete
    }
}
// export const thunkDeleteGalleryPhoto = (deleteId, galleryId) => async (dispatch) => {
//     const response = await fetch(`/api/galleries/${galleryId}/${deleteId}`, {
//         method: "DELETE"
//     })

//     if (response.ok) {
//         await response.json()
//         dispatch(actionDeleteGalleryPhoto(deleteId))
//         return deleteId
//     }
// }


const normalize = (arr) => {
    const resObj = {}
    arr.forEach((ele) => { resObj[ele.id] = ele })
    return resObj
}

const initialState = {}

const galleryReducer = (state = initialState, action) => {
    let newState
    switch (action.type) {
        case LOAD_GALLERIES:
            newState = { ...state }
            newState.allGalleries = normalize(action.galleries)
            return newState
        case LOAD_SINGLEGALLERY:
            newState = { ...state }
            newState.singleGallery = action.gallery
            return newState

        // case CREATE_GALLERY:
        //     newState = { ...state }
        //     newState.allGalleries = { ...newState.allGalleries, [action.newGallery.id]: action.newGallery }
        //     newState.singleGallery = { ...newState.singleGallery, ...action.newGallery }
        //     return newState
        // case EDIT_GALLERY:
        //     newState = { ...state }
        //     newState.allGalleries = { ...newState.allGalleries, [action.editedGallery.id]: action.editedGallery }
        //     newState.singleGallery = { ...newState.singleGallery, ...action.editedGallery }
        //     return newState
        // case DELETE_GALLERY:
        //     newState = { ...state }
        //     delete newState.allGalleries[action.toDelete.id]
        //     newState.allGalleries = { ...newState.allGalleries }
        //     return newState
        // case DELETE_GALLERYPHOTO:
        //     newState = { ...state }
        //     console.log('action', action.toDelete)
        //     console.log('newState.singleGallery.photos', newState.singleGallery.photos)
        //     newState.singleGallery.photos.filter((photo) => photo.id != action.toDelete)
        //     console.log('newState.singleGallery.photos after filter', newState.singleGallery.photos)
        //     newState.singleGallery = {...newState.singleGallery}
        //     return newState
        default:
            return state
    }
}

export default galleryReducer;
