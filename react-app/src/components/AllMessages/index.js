import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { thunkLoadFollowers } from "../../store/follower";
import { thunkLoadConversations } from "../../store/message";
import DirectMessage from "../DirectMessage";
import './AllMessages.css'

const AllMessages = () => {
    const dispatch = useDispatch();
    const [currentMessageId, setCurrentMessageId] = useState("");
    const [toggle, setToggle] = useState(false)

    // Selectors to access data from Redux store
    const user = useSelector((state) => state.session.user);
    const followingObj = useSelector((state) => state.followers.allFollowers);
    const allConversationsObj = useSelector(state => state.message.allConversations)

    useEffect(() => {
        // Load followers and conversations when the component mounts or when the current message id or toggle state changes
        dispatch(thunkLoadFollowers(user.id));
        dispatch(thunkLoadConversations())
    }, [user.id, currentMessageId, toggle]);

    // Return null if follower or conversation data has not loaded yet
    if (!followingObj || !allConversationsObj) return null;
    const conversations = Object.values(allConversationsObj);

    // Get all the followers who are being followed by the logged in user
    const allFollowing = Object.values(followingObj).filter(following => {
        return following.followerId === user.id
    });

    // Filter the followers to show only the ones who have conversations started with the logged in user
    const openConversations = Object.values(followingObj).filter(following => {
        const hasConversation = conversations.some(conversation =>
            (conversation.userId === following.userId || conversation.followingId === following.userId)
        );
        return ((following.followerId === user.id)) && hasConversation;
    });

    // Filter the followers to show only the ones who do not have conversations started with the logged in user
    const notOpenConversations = Object.values(followingObj).filter(following => {
        const hasConversation = conversations.some(conversation =>
            (conversation.userId === following.userId || conversation.followingId === following.userId)
        );
        return ((following.followerId === user.id)) && !hasConversation;
    });

    // Get the currently selected user to display above the chat window
    const selected = allFollowing.filter((follower) => follower.userId == currentMessageId)[0];

    return (
        <div className='messages-background-container'>
            <div className='all-messages-container'>
                <div className="messaging-current-following-container">
                    <h1 className='all-messages-title'>
                        Messenger
                        <i className="fa-regular fa-paper-plane" style={{ marginLeft: '5px', color: 'rgb(8, 112, 209)', fontSize: '18px' }} onClick={() => setCurrentMessageId(null)}> +</i>

                    </h1>
                    <div className='all-messages-users-container'>
                        {openConversations.length > 0 &&
                            openConversations.map((following) => {
                                return (
                                    <div className="all-messages-user" key={following.id}>
                                        <div className="all-messages-single-user" onClick={() => setCurrentMessageId(following.userId)}>
                                            <img className='medium-profile-icon' src={following.userProfile} alt='profile'></img>
                                            <div className='all-messages-user-name'>
                                                {following.userFirstName} {following.userLastName}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                    </div>
                </div>
                <div className="all-messages-single-conversation">
                    <div>
                        {selected && (
                            <div className='all-messages-selected-follower'>
                                <img className='small-profile-icon' src={selected.userProfile} alt='profile'></img>
                                <div className='all-messages-user-name'>
                                    {selected.userFirstName} {selected.userLastName}
                                </div>
                            </div>
                        )}
                        {!selected && (
                            <>
                                <div>
                                    <h3 className='all-messages-title' style={{ fontSize: '16px', padding: '16.75px 5px' }}>New Conversation</h3>
                                </div>
                                <div className='all-messages-new-conversation'>
                                    {notOpenConversations.length > 0 &&
                                        notOpenConversations.map((follow) => {
                                            return (
                                                <div className="all-messages-user" key={follow.id}>
                                                    <div className="all-messages-single-user" onClick={() => { setCurrentMessageId(follow.userId) }}>
                                                        <img className='small-profile-icon' src={follow.userProfile} alt='profile'></img>
                                                        <div className='all-messages-user-name'>
                                                            {follow.userFirstName} {follow.userLastName}
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                </div>
                            </>
                        )}
                    </div>
                    <DirectMessage
                        followingId={currentMessageId}
                        setToggle = {setToggle}
                        toggle={toggle}

                    />
                </div>

            </div>
        </div>
    );
};

export default AllMessages;
