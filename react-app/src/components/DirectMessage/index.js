import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { io } from 'socket.io-client';
import { thunkLoadFollowers } from "../../store/follower";
let socket;

const DirectMessage = () => {
    const dispatch = useDispatch()
    const [chatInput, setChatInput] = useState("");
    const [messages, setMessages] = useState([]);
    const user = useSelector(state => state.session.user)
    const followingObj = useSelector(state => state.followers.allFollowers)

    console.log('following', followingObj)

    console.log('messages', messages)
    console.log('chatInput', chatInput)

    useEffect(() => {
        dispatch(thunkLoadFollowers(user.id))
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
    }, [])

    if (!followingObj) return null
    const following = Object.values(followingObj).filter((following)=> following.userId === user.id)
    console.log('following', following)
    const updateChatInput = (e) => {
        setChatInput(e.target.value)
    };

    const sendChat = (e) => {
        e.preventDefault()
        socket.emit("chat", { userId: user.id, message: chatInput });
        console.log('socket', socket)
        setChatInput("")
    }

    return (user && (
        <div>
            <div className='messaging-side-bar-user-select'>
                <h1>Messenger</h1>
                <div className='messaging-current-open-container'>
                    {following.length > 0 && following.map((follow)=> {
                        return (
                            <div className='messaging-single-message'>
                            {follow.followerFirstName} {follow.followerLastName}
                            </div>
                        )
                    })}
                </div>
            </div>
            <div>
                {messages.map((message, ind) => (
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
