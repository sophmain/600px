import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { thunkLoadFollowers } from "../../store/follower";
import DirectMessage from "../DirectMessage";

const AllMessages = () => {
    const dispatch = useDispatch()
    const [currentMessageId, setCurrentMessageId] = useState('')
    const user = useSelector((state) => state.session.user)
    const followingObj = useSelector(state => state.followers.allFollowers)
    const userMessages = useSelector(state => state.message.allMessages)


    useEffect(() => {
        dispatch(thunkLoadFollowers(user.id))

    }, [user.id, currentMessageId])

    if (!followingObj) return null
    const following = Object.values(followingObj).filter((following) => following.userId === user.id)
    console.log('following', following)
    const followingId = currentMessageId ? currentMessageId : (following ? following[0].followerId : 0 )
    return (
        <div>
            <h1>Messenger</h1>
            <div className='messaging-current-open-container'>
                {following.length > 0 && following.map((follow) => {

                    return (
                        <div className='messaging-user-name' key={follow.id}>
                            <div className='messaging-single-message' onClick={() => setCurrentMessageId(follow.id)}>
                                {follow.followerFirstName} {follow.followerLastName}
                            </div>

                        </div>
                    )
                })}
                <div className='right-side-single-conversation'>
                    <DirectMessage followingId={followingId} />
                </div>
            </div>
        </div>
    )
}
export default AllMessages
