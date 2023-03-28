import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { io } from 'socket.io-client';
import { thunkLoadFollowers } from "../../store/follower";
import { thunkDeleteMessage, thunkLoadMessages } from "../../store/message";
import './DirectMessage.css'


let socket;

const DirectMessage = ({ followingId, setCurrentMessageId }) => {
    const dispatch = useDispatch()
    const [chatInput, setChatInput] = useState("");
    const [messages, setMessages] = useState([]);
    const [selectedMessageId, setSelectedMessageId] = useState(null);
    const user = useSelector(state => state.session.user)

    //filter our current messages based on followerId so when clicking user to chat, only displays that conversation
    const userMessages = messages.filter((message) => (message.followingId == followingId && message.userId == user.id) || (message.userId == followingId && message.followingId == user.id))
    const userHistoryMessagesObj = useSelector(state => state.message.allMessages)

    useEffect(() => {
        dispatch(thunkLoadFollowers(user.id))
        dispatch(thunkLoadMessages(followingId))

        // open socket connection
        // create websocket
        socket = io();

        socket.on("chat", (chat) => {
            setMessages(messages => [...messages, chat])
        })
        socket.on("delete", (messageId) => {
            setMessages(messages => messages.filter((message) => message.id !== messageId));
        })
        // when component unmounts, disconnect
        return (() => {
            socket.disconnect()
        })
    }, [user, dispatch, followingId, messages])

    const updateChatInput = (e) => {
        setChatInput(e.target.value)
    };

    const sendChat = (e) => {
        e.preventDefault()
        socket.emit("chat", { user_id: user.id, message: chatInput, following_id: followingId });
        setChatInput("")
    }
    if (!userHistoryMessagesObj) return null
    const userHistoryMessages = Object.values(userHistoryMessagesObj).filter((message) => {
        // Check if the message is not included in userMessages and filter out duplicates
        return !userMessages.find((userMessage) => userMessage.id === message.id);
    });

    const messageDate = (messageDate) => {

    }
    const deleteMessage = (messageId) => {
        dispatch(thunkDeleteMessage(messageId))
        socket.emit("delete", messageId)
    }

    console.log('userhistory', userHistoryMessages)
    console.log('user messages', userMessages)

    return (user && (
        <div className='direct-message-container'>
            <div className='direct-messages-parent'>
                {userHistoryMessages.concat(userMessages).map((message) => (
                    <>
                        <div
                            className={`direct-message ${message.userId === followingId ? 'follower' : 'user'}`}
                            key={message.id}
                            onMouseEnter={() => setSelectedMessageId(message.id)}
                            onMouseLeave={() => {
                                setSelectedMessageId(null);
                            }}
                        >
                            {message.message}
                            {selectedMessageId === message.id && message.userId === user.id && (
                                <div className="direct-message-options">
                                    <button
                                        className="direct-message-option"
                                        onClick={() => deleteMessage(message.id)}
                                    >
                                        Delete
                                    </button>
                                    <div
                                        className="direct-message-option"
                                        onClick={() => console.log('Edit message')}
                                    >
                                        Edit
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className='direct-message-time'>{() => messageDate(message.createdAt)}</div>
                    </>
                ))}

                {/* {userMessages.map((message, ind) => (

                    <div className={`direct-message-live ${message.userId === followingId ? 'follower' : 'user'}`} key={ind}>{`${message.message}`}</div>
                ))} */}
            </div>
            <form className='direct-message-typing-box-container' onSubmit={sendChat}>
                <input
                    className='direct-message-typing-box'
                    value={chatInput}
                    onChange={updateChatInput}
                />
                <button className='direct-message-send' type="submit">Send</button>
            </form>
        </div>
    )
    )
};


export default DirectMessage;
