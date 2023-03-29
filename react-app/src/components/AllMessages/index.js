import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { thunkLoadFollowers } from "../../store/follower";
import { thunkLoadConversations, thunkLoadMessages } from "../../store/message";
import DirectMessage from "../DirectMessage";
import './AllMessages.css'

const AllMessages = () => {
    const dispatch = useDispatch();
    const [currentMessageId, setCurrentMessageId] = useState("");

    const user = useSelector((state) => state.session.user);
    const followingObj = useSelector((state) => state.followers.allFollowers);
    const allConversationsObj = useSelector(state => state.message.allConversations)

    useEffect(() => {
        dispatch(thunkLoadFollowers(user.id));
        dispatch(thunkLoadConversations())

    }, [user.id, currentMessageId]);

    if (!followingObj || !allConversationsObj) return null;
    const conversations = Object.values(allConversationsObj)
    console.log('conversations', conversations)
    console.log(Object.values(followingObj))

const following = Object.values(followingObj).filter(following => {
  return following.userId === user.id && conversations.some(
    conversation => conversation.followingId == following.followerId
  );
});
console.log('following', following)
    // if (!userHistoryMessagesObj) return null
    // console.log('history', Object.values(userHistoryMessagesObj))
    // current selected user to display above chat window
    const selected = following.filter((follower) => follower.followerId == currentMessageId)[0]

    return (
        <div className='messages-background-container'>
            <div className='all-messages-container'>
                <div className="messaging-current-following-container">
                    <h1 className='all-messages-title'>Messenger</h1>
                    <div className='all-messages-users-container'>
                        {following.length > 0 &&
                            following.map((following) => {
                                return (
                                    <div className="all-messages-user" key={following.id}>
                                        <div className="all-messages-single-user" onClick={() => setCurrentMessageId(following.followerId)}>
                                            <img className='medium-profile-icon' src={following.followerProfile} alt='profile'></img>
                                            <div className='all-messages-user-name'>
                                                {following.followerFirstName} {following.followerLastName}
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
                                <img className='small-profile-icon' src={selected.followerProfile} alt='profile'></img>
                                <div className='all-messages-user-name'>
                                    {selected.followerFirstName} {selected.followerLastName}
                                </div>
                            </div>
                        )}
                        {/* {!selected && (
                            <>
                                <div>
                                    <h2>New Conversation</h2>
                                </div>
                                <div className='all-messages-new-conversation'>
                                    {following.length > 0 &&
                                        following.map((follow) => {
                                            return (
                                                <div className="all-messages-user" key={follow.id}>
                                                    <div className="all-messages-single-user" onClick={() => setCurrentMessageId(follow.followerId)}>
                                                        <img className='medium-profile-icon' src={follow.followerProfile} alt='profile'></img>
                                                        <div className='all-messages-user-name'>
                                                            {follow.followerFirstName} {follow.followerLastName}
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                </div>
                            </>
                        )} */}
                    </div>
                    <DirectMessage
                        followingId={currentMessageId}

                    />
                </div>

            </div>
        </div>
    );
};

export default AllMessages;
