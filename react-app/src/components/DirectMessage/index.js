import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { io } from 'socket.io-client';
import { thunkLoadFollowers } from "../../store/follower";
import { thunkLoadMessages } from "../../store/message";
import './DirectMessage.css'


let socket;

const DirectMessage = ({ followingId, setCurrentMessageId }) => {
    const dispatch = useDispatch()
    const [chatInput, setChatInput] = useState("");
    const [messages, setMessages] = useState([]);
    const user = useSelector(state => state.session.user)

    //filter our current messages based on followerId so when clicking user to chat, only displays that conversation
    console.log('messages', messages)
    console.log('followingId', followingId)
    const userMessages = messages.filter((message) => (message.followingId == followingId && message.userId == user.id) || (message.userId == followingId && message.followingId == user.id))
    console.log('user messages', userMessages)
    const userHistoryMessagesObj = useSelector(state => state.message.allMessages)

    useEffect(() => {
        dispatch(thunkLoadFollowers(user.id))
        dispatch(thunkLoadMessages(followingId))
        //setCurrentMessageId(followingId);
        // open socket connection
        // create websocket
        socket = io();

        socket.on("chat", (chat) => {
            setMessages(messages => [...messages, chat])
        })
        // when component unmounts, disconnect
        return (() => {
            socket.disconnect()
        })
    }, [user, dispatch, followingId])

    const updateChatInput = (e) => {
        setChatInput(e.target.value)
    };

    const sendChat = (e) => {
        e.preventDefault()
        socket.emit("chat", { user_id: user.id, message: chatInput, following_id: followingId });
        setChatInput("")
    }
    if (!userHistoryMessagesObj) return null
    const userHistoryMessages = Object.values(userHistoryMessagesObj)
    console.log('userHistory', userHistoryMessages)

    return (user && (
        <div className='direct-message-container'>
            <div className='direct-messages-parent'>
                {userHistoryMessages.map((message, ind) => (
                    <div className={`direct-message-history ${message.userId === followingId ? 'follower' : 'user'}`} key={ind}>{`${message.userId}: ${message.message}`}</div>
                ))}
                {userMessages.map((message, ind) => (

                    <div className={`direct-message-live ${message.userId === followingId ? 'follower' : 'user'}`} key={ind}>{`${message.userId}: ${message.message}`}</div>
                ))}
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
