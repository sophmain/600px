const LOAD_ALL_COMMENTS = 'comments/LOAD_COMMENTS'
const POST_COMMENT = 'comments/POST_COMMENT'
const EDIT_COMMENT = 'comments/EDIT_COMMENT'
const DELETE_COMMENT = 'comments/DELETE_COMMENT'

//action creators
const actionLoadComments = (comments, photoId)=> ({
    type: LOAD_ALL_COMMENTS,
    photoId,
    comments
})

const actionPostComment = (comment)=> ({
    type: POST_COMMENT,
    comment
})

const actionEditComment = (comment)=> ({
    type: EDIT_COMMENT,
    comment
})

const actionDeleteComment = (comment) => ({
    type: DELETE_COMMENT,
    comment
})

//thunks
export const thunkLoadAllComments = (photoId) => async (dispatch) => {
    const response = await fetch(`/api/photos/${photoId}/comments`);

    if (response.ok) {
        const allComments = await response.json();
        dispatch(actionLoadComments(allComments));
        return allComments;
    }

};

export const thunkPostComment = (comment, photoId) => async (dispatch) => {
    const response = await fetch(`/api/photos/${photoId}/comments`, {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(comment)
    })
    if (response.ok) {
        const newComment = await response.json()
        dispatch(actionPostComment(newComment))
        return newComment
    } else if (response.status < 500) {
        const newComment = await response.json()
        if (newComment.errors) {
			return newComment.errors;
		}
    } else {
        return ["An error occurred. Please try again."];
    }
}

export const thunkEditComment = (updatedComment, commentId) => async (dispatch) => {
    const response = await fetch(`/api/comments/${commentId}`, {
        method: "PUT",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedComment)
    })

    if (response.ok) {
        const updatedComment = await response.json()
        dispatch(actionEditComment(updatedComment))
        return updatedComment;

    } else if (response.status < 500) {
        const updatedComment = await response.json()
        if (updatedComment.errors) {
            return updatedComment.errors;
        }
    } else {
        return ["An error occurred. Please try again."];
    }
}

export const thunkDeleteComment = (commentId) => async (dispatch) => {
    const response = await fetch(`/api/comments/${commentId}`, {
        method: "DELETE"
    })
    if (response.ok) {
        const comment = await response.json()
        dispatch(actionDeleteComment(comment))
        return comment
    }
}

//normalize function to make key the id
const normalize = (arr) => {
    const resObj = {}
    arr.forEach((ele) => { resObj[ele.id] = ele })
    return resObj
}

//comments reducer function
const initialState = {}
const commentsReducer = (state = initialState, action) => {
    let newState
    switch(action.type) {
        case LOAD_ALL_COMMENTS:
            newState = { ...state }
            newState.photoComments = normalize(action.comments)
            return newState
        case POST_COMMENT:
            newState = { ...state }
            newState.photoComments = { ...newState.photoComments, [action.comment.id]: action.comment }
            // newState.singleComment = { ...newState.singleComment, ...action.comment }
            return newState
        case EDIT_COMMENT:
            newState = { ...state }
            newState.photoComments = {...newState.photoComments, [action.comment.id]: action.comment }
            return newState
        case DELETE_COMMENT:
            console.log('action.comment', action.comment)
            newState = { ...state }
            delete newState.photoComments[action.comment.id]
            newState.photoComments = { ...newState.photoComments}
            return newState
        default:
            return state
    }
}

export default commentsReducer
