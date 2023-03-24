const LOAD_MESSAGES = 'messages/LOAD_MESSAGES'

const actionLoadMessages = (messages) => ({
    type: LOAD_MESSAGES,
    messages
})

export const thunkLoadMessages = (currentMessageId) => async (dispatch) => {
    const response = await fetch(`/api/messages/${currentMessageId}`)
    if (response.ok) {
        const messages = await response.json()
        dispatch(actionLoadMessages(messages))
        return messages
    }
}

const normalize = (arr) => {

    const resObj = {}
    arr.forEach((ele) => { resObj[ele.id] = ele })
    return resObj
}

const initialState = {}

const messageReducer = (state = initialState, action) => {
    let newState
    switch (action.type) {
        case LOAD_MESSAGES:
            newState = { ...state }
            newState.allMessages = normalize(action.messages)
            return newState
        default:
            return state
    }
}
export default messageReducer
