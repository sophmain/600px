import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { io } from 'socket.io-client';
import { thunkLoadFollowers } from "../../store/follower";
import { thunkLoadMessages } from "../../store/message";


let socket;

const DirectMessage = ({ followingId }) => {
    const dispatch = useDispatch()
    const [chatInput, setChatInput] = useState("");
    const [messages, setMessages] = useState([]);
    const user = useSelector(state => state.session.user)

    //filter our current messages based on followerId so when clicking user to chat, only displays that conversation
    const userMessages = messages.filter((message) => message.followingId == followingId)
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
        // when component unmounts, disconnect
        return (() => {
            socket.disconnect()
        })
    }, [followingId])

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

    return (user && (
        <div>
            <div>
                {userHistoryMessages.map((message, ind) => (
                    <div key={ind}>{`${message.userId}: ${message.message}`}</div>
                ))}
                {userMessages.map((message, ind) => (

                    <div key={ind}>{`${message.userId}: ${message.message}`}</div>
                ))}
            </div>
            <form onSubmit={sendChat}>
                <input
                    value={chatInput}
                    onChange={updateChatInput}
                />
                <button type="submit">Send</button>
            </form>
        </div>
    )
    )
};


export default DirectMessage;
