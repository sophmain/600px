import { useEffect } from "react"
import { thunkLoadConversations } from "../../store/message"


const newConversation = () => {
    const user = useSelector((state) => state.session.user);
    const followingObj = useSelector((state) => state.followers.allFollowers);
    const allConversationsObj = useSelector(state => state.message.allConversations)

    useEffect(() => {
        dispatch(thunkLoadFollowers(user.id));
        dispatch(thunkLoadConversations())
    }, [])
    if (!followingObj || !allConversationsObj) return null;
    const conversations = Object.values(allConversationsObj)

    return (
        <div>
            <div>
                <h3 className='all-messages-title' style={{ fontSize: '16px', padding: '16.75px 5px' }}>New Conversation</h3>
            </div>
            <div className='all-messages-new-conversation'>
                {/* <p className='all-messages-following-subheader'>Following</p> */}
                {notOpenConversations.length > 0 &&
                    notOpenConversations.map((follow) => {
                        return (
                            <div className="all-messages-user" key={follow.id}>
                                <div className="all-messages-single-user" onClick={() => { setCurrentMessageId(follow.followerId) }}>
                                    <img className='small-profile-icon' src={follow.followerProfile} alt='profile'></img>
                                    <div className='all-messages-user-name'>
                                        {follow.followerFirstName} {follow.followerLastName}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
            </div>
        </div>
    )
}
export default newConversation
