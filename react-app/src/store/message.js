const LOAD_MESSAGES = 'messages/LOAD_MESSAGES'
const LOAD_ALLCONVERSATIONS = 'messages/LOAD_ALLCONVERSATIONS'
const DELETE_MESSAGE = 'messages/DELETE_MESSAGE'

const actionLoadMessages = (messages) => ({
    type: LOAD_MESSAGES,
    messages
})
const actionDeleteMessage = (messageId) => ({
    type: DELETE_MESSAGE,
    messageId
})
const actionLoadConversations = (conversations) => ({
    type: LOAD_ALLCONVERSATIONS,
    conversations
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
    const response = await fetch(`/api/messages/${messageId}`, {
        method: 'DELETE'
    })
    if (response.ok){
        const deleteMessage = await response.json()
        dispatch(actionDeleteMessage(messageId))
        return messageId
    }
}
export const thunkLoadConversations = () => async (dispatch) => {
    const response = await fetch(`/api/messages/`)
    if (response.ok) {
        const messages = await response.json()
        dispatch(actionLoadConversations(messages))
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
        case LOAD_ALLCONVERSATIONS:
            newState = { ...state }
            newState.allConversations = normalize(action.conversations)
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
