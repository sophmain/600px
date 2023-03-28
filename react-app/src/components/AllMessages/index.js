import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { thunkLoadFollowers } from "../../store/follower";
import DirectMessage from "../DirectMessage";
import './AllMessages.css'

const AllMessages = ({setIsLoaded}) => {
    const dispatch = useDispatch();
    const [currentMessageId, setCurrentMessageId] = useState("");
    const user = useSelector((state) => state.session.user);
    const chatBoxRef = useRef(null);
    const followingObj = useSelector((state) => state.followers.allFollowers);

    useEffect(() => {
        dispatch(thunkLoadFollowers(user.id));
        setIsLoaded(true)
    }, [user.id, currentMessageId]);

    if (!followingObj) return null;

    const following = Object.values(followingObj).filter(
        (following) => following.userId === user.id
    );
    const selected = following.filter((follower) => follower.followerid = currentMessageId)[0]


    return (
        <div className='all-messages-container'>
            <div className="messaging-current-following-container">
                <h1 className='all-messages-title'>Messenger</h1>
                <div className='all-messages-users-container'>
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
                </div>
                <DirectMessage
                    setIsLoaded={setIsLoaded}
                    followingId={currentMessageId}
                    chatBoxRef={chatBoxRef}
                />
            </div>

        </div>
    );
};

export default AllMessages;
