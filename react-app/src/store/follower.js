const LOAD_FOLLOWERS = 'follower/LOAD_FOLLOWERS'
const LOAD_FOLLOWING = 'follower/LOAD_FOLLOWING'

const actionLoadFollowers = (followers) => ({
    type: LOAD_FOLLOWERS,
    followers
})
// const actionLoadFollowing = (following) => ({
//     type: LOAD_FOLLOWING,
//     following
// })

export const thunkLoadFollowers = (userId) => async (dispatch) => {
    const response = await fetch(`/api/users/${userId}/followers`)

    if (response.ok) {
        const followers = await response.json()
        dispatch(actionLoadFollowers(followers))
        return followers
    }
}

// export const thunkLoadFollowing = (userId) => async (dispatch) => {
//     const response = await fetch(`/api/users/${userId}/following`)
//     console.log('response in following thunk', response)
//     if (response.ok) {
//         const following = await response.json()
//         dispatch(actionLoadFollowing(following))
//         return following
//     }
// }

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
        // case LOAD_FOLLOWING:
        //     newState = { ...state }
        //     newState.allFollowing = normalize(action.following)
        //     return newState
        default:
            return state
    }
}

export default followerReducer;
