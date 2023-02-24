const LOAD_GALLERIES = 'gallery/LOAD_GALLERIES'

const actionLoadGalleries = (galleries) => ({
    type: LOAD_GALLERIES,
    galleries
})

export const thunkLoadGalleries = () => async (dispatch) => {
    const response = await fetch('/api/galleries/')
    if (response.ok) {
        const galleries = await response.json()
        dispatch(actionLoadGalleries(galleries))
        return galleries
    }
}

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
        default:
            return state
    }
}

export default galleryReducer
