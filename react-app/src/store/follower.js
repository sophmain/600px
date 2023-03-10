const LOAD_FOLLOWERS = 'follower/LOAD_FOLLOWERS'
const POST_FOLLOW = 'follower/POST_FOLLOW'

const actionLoadFollowers = (followers) => ({
    type: LOAD_FOLLOWERS,
    followers
})
const actionPostFollow = (follow) => ({
    type: POST_FOLLOW,
    follow
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
    console.log('response in post follow thunk', response)
    if (response.ok) {
        const newFollowing = await response.json()
        dispatch(actionPostFollow(newFollowing))
        return newFollowing
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
        default:
            return state
    }
}

export default followerReducer;
