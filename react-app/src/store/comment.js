const LOAD_ALL_COMMENTS = 'comments/LOAD'

//action creators
const loadAllCommentsAction = (comments, photoId)=> ({
    type: LOAD_ALL_COMMENTS,
    photoId,
    comments
})

//thunks
export const thunkLoadAllComments = (photoId) => async dispatch => {
    const response = await fetch(`/api/photos/${photoId}/comments`);

    if (response.ok) {
        const allComments = await response.json();
        dispatch(loadAllCommentsAction(allComments));
        return allComments;
    }

};
//normalize function to make key the id
const normalize = (arr) => {
    const resObj = {}
    arr.forEach((ele) => { resObj[ele.id] = ele })
    return resObj
}

//comments reducer function
const initialState = {}
const commentsReducer = (state = initialState, action) => {
    switch(action.type) {
        case LOAD_ALL_COMMENTS:
            const newState = { ...state }
            newState.photoComments = normalize(action.comments)
            return newState
        default:
            return state
    }
}

export default commentsReducer
