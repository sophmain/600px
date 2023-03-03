const LOAD_LIKES = 'likes/LOAD_LIKES'
const POST_LIKE = 'likes/POST_LIKE'
const DELETE_LIKE = 'likes/DELETE_LIKE'
// const LOAD_SINGLELIKE = 'likes/LOAD_SINGLELIKE'

//action creators
const actionLoadLikes = (likes, photoId)=> ({
    type: LOAD_LIKES,
    photoId,
    likes
})
const actionPostLike = (like) => ({
    type: POST_LIKE,
    like
})
const actionDeleteLike = (deleteId) => ({
    type: DELETE_LIKE,
    deleteId
})
// const actionLoadSingleLike = (like) => ({
//     type: LOAD_SINGLELIKE,
//     like
// })

//thunks
export const thunkLoadAllLikes = (photoId) => async (dispatch) => {
    const response = await fetch(`/api/photos/${photoId}/likes`);

    if (response.ok) {
        const allLikes = await response.json();
        dispatch(actionLoadLikes(allLikes));
        return allLikes;
    }

};

// export const thunkLoadSingleLike = (photoId) => async (dispatch) => {
//     const response = await fetch(`/api/photos/${photoId}/likes/one`)

//     if (response.ok) {
//         const singleLike = await response.json()
//         dispatch(actionLoadSingleLike(singleLike))
//         return singleLike
//     }
// }

export const thunkPostLike = (photoId, userId) => async (dispatch) => {
    const response = await fetch(`/api/photos/${photoId}/likes`, {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userId)
    })

    if (response.ok) {
        const newLike = await response.json()
        dispatch(actionPostLike(newLike))
        return newLike;
    } else if (response.status < 500) {
        const newLike = await response.json()
        if (newLike.errors) {
            return newLike.errors;
        }
    } else {
        return ["An error occurred. Please try again."];
    }
}
export const thunkDeleteLike = (deleteId) => async (dispatch) => {
    const response = await fetch(`/api/likes/${deleteId}`, {
        method: "DELETE"
    })

    if (response.ok) {
        await response.json()
        dispatch(actionDeleteLike(deleteId))
        return deleteId
    }
}

//normalize function to make key the id
const normalize = (arr) => {
    const resObj = {}
    arr.forEach((ele) => { resObj[ele.id] = ele })
    return resObj
}

//likes reducer function
const initialState = {}
const likesReducer = (state = initialState, action) => {
    let newState
    switch(action.type) {
        case LOAD_LIKES:
            newState = { ...state }
            newState.photoLikes = normalize(action.likes)
            return newState
        // case LOAD_SINGLELIKE:
        //     newState = { ...state }
        //     newState.singleLike = action.like
        //     return newState
        case DELETE_LIKE:
            newState = { ...state }
            delete newState.photoLikes[action.deleteId]
            newState.photoLikes = { ...newState.photoLikes }
            return newState
        case POST_LIKE:
            newState = { ...state }
            newState.photoLikes = { ...newState.photoLikes, [action.like.id]: action.like}
            return newState
        default:
            return state
    }
}
export default likesReducer
