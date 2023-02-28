import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, NavLink, useHistory } from "react-router-dom";
import { thunkLoadGalleries } from "../../store/gallery";
import { thunkLoadPhotos } from "../../store/photo";
import { thunkGetUser } from "../../store/session";
import './UserProfile.css'


const UserProfile = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const { userId } = useParams()

    useEffect(() => {
        dispatch(thunkGetUser(userId))
        dispatch(thunkLoadPhotos())
    }, [dispatch, userId])

    const user = useSelector((state) => state.session.singleUser)
    const photos = useSelector((state) => state.photos.allPhotos)

    if (!user) return null
    let photoArr = []
    if (photos) {
        photoArr = Object.values(photos)
    }
    const userPhotos = photoArr.filter((photo) => photo.userId == user.id)

    const toSinglePhoto = (photo) => {
        history.push(`/photos/${photo.id}`)
    }

    return (
        <div className='profile-container'>
            <img className='prof-cover-photo' src={user.cover_photo_url} alt='cover photo'></img>
            <img className='prof-photo' src={user.prof_photo_url} alt='profile'></img>
            <div className='profile-info'>
                <div className='profile-edit-buttons'>
                    <button className='edit-profile-button'><i className="fa-regular fa-pen-to-square"></i></button>
                </div>
                <h1 className='user-profile-name'>{user.firstName} {user.lastName}</h1>
                <div className='user-profile-location'><i className="fa-solid fa-location-dot"></i>{user.city}, {user.country}</div>
            </div>
            <div className='profile-link-headers'>
                <NavLink to={`/profile/${user.id}`} className='selected-subheader' style={{marginRight: '8px'}}>Photos</NavLink>
                <NavLink to={`/profile/${user.id}/galleries`} className='not-selected-subheader'>Galleries</NavLink>
            </div>
            <div className='user-photos-container'>

                <div className='user-photos-mapped'>
                    {userPhotos && userPhotos.map((photo) => {
                        return (
                            <img src={photo.photoUrl} className='image-size' onClick={() => toSinglePhoto(photo)} style={{cursor: 'pointer'}} alt='user image'></img>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}
export default UserProfile
