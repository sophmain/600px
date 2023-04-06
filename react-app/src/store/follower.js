const LOAD_FOLLOWERS = 'follower/LOAD_FOLLOWERS'
const POST_FOLLOW = 'follower/POST_FOLLOW'
const DELETE_FOLLOW = 'follower/DELETE_FOLLOW'

const actionLoadFollowers = (followers) => ({
    type: LOAD_FOLLOWERS,
    followers
})
const actionPostFollow = (follow) => ({
    type: POST_FOLLOW,
    follow
})
const actionDeleteFollow = (followId) => ({
    type: DELETE_FOLLOW,
    followId
})

export const thunkLoadFollowers = (userId) => async (dispatch) => {
    const response = await fetch(`/api/users/${userId}/followers`)

    if (response.ok) {
        const followers = await response.json()
        dispatch(actionLoadFollowers(followers))
        return followers
    }
}

export const thunkPostFollow = (payload) => async (dispatch) => {
    const response = await fetch(`/api/users/${payload.userId}/following`, {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    })
    if (response.ok) {
        const newFollowing = await response.json()
        dispatch(actionPostFollow(newFollowing))
        return newFollowing
    }
}

export const thunkDeleteFollow = (deleteId) => async (dispatch) => {
    const response = await fetch(`/api/followers/${deleteId}`, {
        method: "DELETE"
    })

    if (response.ok) {
        await response.json()
        dispatch(actionDeleteFollow(deleteId))
        return deleteId
    }
}

const normalize = (arr) => {
    const resObj = {}
    arr.forEach((ele) => { resObj[ele.id] = ele })
    return resObj
}

const initialState = {}

const followerReducer = (state = initialState, action) => {
    let newState
    switch (action.type){
        case LOAD_FOLLOWERS:
            newState = { ...state }
            newState.allFollowers = normalize(action.followers)
            return newState
        case POST_FOLLOW:
            newState = { ...state }
            newState.allFollowers = { ...newState.allFollowers, [action.follow.id]: action.follow}
            return newState
        case DELETE_FOLLOW:
            newState = { ...state }
            delete newState.allFollowers[action.followId]
            newState.allFollowers = { ...newState.allFollowers }
            return newState
        default:
            return state
    }
}

export default followerReducer;
