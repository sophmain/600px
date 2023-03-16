import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, NavLink, useHistory } from "react-router-dom";
import { thunkDeleteFollow, thunkLoadFollowers, thunkPostFollow } from "../../store/follower";
import { thunkLoadPhotos } from "../../store/photo";
import { thunkGetUser } from "../../store/session";
import OpenModalButton from "../OpenModalButton";
import FollowerModal from "../FollowersModal";
import FollowingModal from "../FollowingModal";
import './UserProfile.css'



const UserProfile = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const { userId } = useParams()

    useEffect(() => {
        dispatch(thunkGetUser(userId))
        dispatch(thunkLoadPhotos())
        dispatch(thunkLoadFollowers(userId))
    }, [dispatch, userId])

    const user = useSelector((state) => state.session.singleUser)
    const sessionUser = useSelector((state) => state.session.user)
    const photos = useSelector((state) => state.photos.allPhotos)
    const followerFollowing = useSelector((state) => state.followers.allFollowers)

    if (!followerFollowing || !user || !photos) return null

    // get array of followers/following and split into respective groups
    const followersArr = Object.values(followerFollowing)
    const following = followersArr.filter((following) => following.followerId === +userId)
    const followers = followersArr.filter((follower) => follower.userId === +userId)

    // get individual user's photos
    let photoArr = Object.values(photos)
    const userPhotos = photoArr.filter((photo) => photo.userId === user.id)


    const toSinglePhoto = (photo) => {
        history.push(`/photos/${photo.id}`)
    }

    const editProfile = (e) => {
        e.preventDefault()
        history.push(`/profile/${sessionUser.id}/edit`)
    }
    //if logged in user has no images, upload button shows
    const uploadPhoto = (e) => {
        e.preventDefault()
        history.push(`/upload`)
    }
    //follow user when clicking follow button
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
        <div className='profile-container'>
            <div className='prof-images-container'>
                {user.cover_photo_url && (
                    <img className='prof-cover-photo' src={user.cover_photo_url} alt='cover'></img>
                )}
                {!user.cover_photo_url && (
                    <img className='prof-cover-photo' src='https://images.pexels.com/photos/933054/pexels-photo-933054.jpeg' alt='mountins'></img>
                )}
                <div className='prof-photo-container'>
                    {user.prof_photo_url && (
                        <img className='prof-photo' src={user.prof_photo_url} alt='profile'></img>
                    )}
                    {!user.prof_photo_url && (
                        <i className="fa-solid fa-user-large prof-photo"></i>
                    )}
                </div>
                <div className='profile-info'>
                    {sessionUser.id === +userId && (
                        <div className='profile-edit-buttons'>
                            <button className='edit-profile-button-page' onClick={(e) => editProfile(e)}><i className="fa-regular fa-pen-to-square"></i></button>
                        </div>
                    )}
                    {sessionUser.id !== +user.id && (
                        <div className='profile-edit-buttons'></div>
                    )}
                    <h1 className='user-profile-name'>{user.firstName} {user.lastName}</h1>
                    {user.city && (
                        <div className='user-profile-location'><i className="fa-solid fa-location-dot"></i>{user.city}, {user.country}</div>
                    )}
                    {sessionUser.id !== +user.id && (
                        <>
                            {!isFollowing && (
                                <button className='profile-follow-user-button' onClick={followUser} >Follow</button>
                            )}
                            {isFollowing && (
                                <button className='profile-unfollow-user-button' onClick={unfollowUser}><span>Following</span></button>
                            )}
                        </>
                    )}

                    <div className='user-follower-following-container'>
                        <OpenModalButton
                            className='photo-likes-modal'
                            buttonText={
                                <span className='follower-modal-button-text'>
                                    <div className='user-followers-count' style={{ marginRight: '10px', fontSize: '14px' }}>{followers.length} <span style={{ fontWeight: 'bold' }}>Followers</span></div>
                                </span>
                            }
                            modalComponent={<FollowerModal userId={userId} />}
                        ></OpenModalButton>
                        <OpenModalButton
                            className='photo-likes-modal'
                            buttonText={
                                <span className='follower-modal-button-text'>
                                    <div className='user-followers-count' style={{ marginRight: '10px', fontSize: '14px' }}>{following.length} <span style={{ fontWeight: 'bold' }}>Following</span></div>
                                </span>
                            }
                            modalComponent={<FollowingModal userId={userId} />}
                        ></OpenModalButton>
                    </div>

                </div>
                <div className='profile-link-headers'>
                    <NavLink to={`/profile/${user.id}`} className='selected-subheader' style={{ marginRight: '8px' }}>Photos</NavLink>
                    <NavLink to={`/profile/${user.id}/galleries`} className='not-selected-subheader'>Galleries</NavLink>
                </div>
            </div>
            <div className='no-user-photos-container'>
                {userPhotos.length === 0 && sessionUser.id === +user.id && (
                    <div className='work-in-progress-photos'>
                        <p className='profile-no-photos-yet'>
                            No images uploaded yet
                        </p>
                        <button className='upload-photo-button' onClick={(e) => uploadPhoto(e)}><i className="fa-solid fa-arrow-up"></i>Upload</button>
                    </div>
                )}

                {sessionUser.id !== +userId && userPhotos.length === 0 && (
                    <div className='work-in-progress-photos'>
                        <i className="fa-regular fa-images"></i>
                        <h1 className='work-in-progress-title'>Work in progress</h1>
                        <p className='work-in-progress-detail'>{user.firstName} hasn't uploaded any photos. Check back soon.</p>
                    </div>
                )}
            </div>

            <div className='user-photos-container'>
                <div className='user-photos-mapped'>
                    {userPhotos && userPhotos.map((photo) => {
                        return (
                            <div className='photo-card' key={photo.id}>
                                <div className='image-overlay-3'>
                                    <h4 className='overlay-3-text'>{photo.title}</h4>

                                </div>
                                <img src={photo.photoUrl} className='image-size' onClick={() => toSinglePhoto(photo)} style={{ cursor: 'pointer' }} alt='user'></img>
                                <div className='image-overlay-4'>
                                    <div className='overlay-2-text overlay-bottom-text'>
                                        {photo.uploadedFirstName} {photo.uploadedLastName}
                                    </div>
                                </div>
                            </div>
                        )
                    })}

                </div>
            </div>
        </div >
    )
}
export default UserProfile
