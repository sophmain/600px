import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { NavLink } from "react-router-dom"
import { useModal } from "../../context/Modal"
import { thunkLoadFollowers, thunkPostFollow, thunkDeleteFollow } from "../../store/follower";


const FollowingModal = ({ userId }) => {
    const dispatch = useDispatch()
    const { closeModal } = useModal();

    const sessionUser = useSelector((state) => state.session.user)

    useEffect(() => {
        dispatch(thunkLoadFollowers(userId))
    }, [dispatch, sessionUser])


    const followerFollowing = useSelector((state) => state.followers.allFollowers)
    if (!followerFollowing) return null

    // get array of followers/following and split into respective groups
    const followersArr = Object.values(followerFollowing)
    const following = followersArr.filter((following) => following.followerId === +userId)
    const followers = followersArr.filter((follower) => follower.userId === +userId)
    // boolean to check if user is already following to conditionally render follow button
    const isFollowing = followers.filter((follower) => follower.followerId === sessionUser.id).length > 0

    const payload = {
        userId: sessionUser.id,
        followingId: userId
    }
    const followUser = () => {
        dispatch(thunkPostFollow(payload))
    }
    // remove a follow when clicking unfollow button
    //find follow to delete
    const followDelete = followers.filter((follower) => follower.followerId === sessionUser.id)[0]
    const unfollowUser = () => {
        dispatch(thunkDeleteFollow(followDelete.id))
    }

    return (
        <div className='follower-modal-container'>
            <div className='exit-follower-modal' onClick={closeModal}><i className="fa-solid fa-x"></i></div>
            <h1 className='follower-modal-header'>Following {following.length}</h1>
            {following.length > 0 && following.map((user) => {
                return (
                    <div key={user.userId} className='follower-modal-name-container'>
                        <img className='small-profile-icon' style={{ marginRight: '5px'}} src={user.userProfile} alt='profile'></img>
                        <NavLink to={`/profile/${user.userId}`} className='photo-like-container-name' onClick={closeModal}>{user.userFirstName} {user.userLastName}</NavLink>
                        {/* {sessionUser.id !== +follower.followerId && (
                            <>
                                {!isFollowing && (
                                    <button className='profile-follow-user-button' onClick={followUser} >Follow</button>
                                )}
                                {isFollowing && (
                                    <button className='profile-unfollow-user-button' onClick={unfollowUser}><span>Following</span></button>
                                )}
                            </>
                        )} */}
                    </div>
                )
            })}
        </div>

    )
}

export default FollowingModal
