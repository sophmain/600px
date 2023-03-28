const LOAD_MESSAGES = 'messages/LOAD_MESSAGES'
const DELETE_MESSAGE = 'messages/DELETE_MESSAGE'

const actionLoadMessages = (messages) => ({
    type: LOAD_MESSAGES,
    messages
})
const actionDeleteMessage = (messageId) => ({
    type: DELETE_MESSAGE,
    messageId
})

export const thunkLoadMessages = (currentMessageId) => async (dispatch) => {
    const response = await fetch(`/api/messages/${currentMessageId}`)
    if (response.ok) {
        const messages = await response.json()
        dispatch(actionLoadMessages(messages))
        return messages
    }
}

export const thunkDeleteMessage = (messageId) => async (dispatch) => {
    console.log('in thunk')
    const response = await fetch(`/api/messages/${messageId}`, {
        method: 'DELETE'
    })
    console.log('response in thunk', response)
    if (response.ok){
        const deleteMessage = await response.json()
        console.log('delete message', deleteMessage)
        dispatch(actionDeleteMessage(messageId))
        return messageId
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
        case DELETE_MESSAGE:
            newState = { ...state }
            delete newState.allMessages[action.messageId]
            newState.allMessages = { ...newState.allMessages }
            return newState
        default:
            return state
    }
}
export default messageReducer
