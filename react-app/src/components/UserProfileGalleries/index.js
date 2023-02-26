import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, NavLink, useHistory } from "react-router-dom";
import { thunkLoadGalleries } from "../../store/gallery";
import { thunkLoadPhotos } from "../../store/photo";
import { thunkGetUser } from "../../store/session";



const UserProfileGalleries = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const { userId } = useParams()

    useEffect(() => {
        dispatch(thunkGetUser(userId))
        dispatch(thunkLoadGalleries())
    }, [dispatch, userId])

    const user = useSelector((state) => state.session.singleUser)
    const galleries = useSelector((state) => state.galleries.allGalleries)

    if (!user) return null
    let galleryArr = []
    if (galleries) {
        galleryArr = Object.values(galleries)
    }
    const userGalleries = galleryArr.filter((gallery) => gallery.userId == user.id)

    const toGallery = (e, gallery) => {
        e.preventDefault()
        history.push(`/galleries/${gallery.id}`)
    }

    return (
        <div className='profile-container'>
            <img className='prof-cover-photo' src={user.cover_photo_url} alt='cover photo'></img>
            <img className='prof-photo' src={user.prof_photo_url} alt='profile'></img>
            <div className='profile-info'>
                <div className='profile-edit-buttons'></div>
                <h1 className='user-profile-name'>{user.firstName} {user.lastName}</h1>
                <div className='user-profile-location'><i class="fa-solid fa-location-dot"></i>{user.city}, {user.country}</div>
            </div>
            <div className='profile-link-headers'>
                <NavLink to={`/profile/${user.id}`} className='user-photos-title'>Photos</NavLink>
                <NavLink to={`/profile/${user.id}/galleries`}>Galleries</NavLink>
            </div>
            <div className='user-photos-container'>

                <div className='user-photos-mapped'>
                    {userGalleries && userGalleries.map((gallery) => {
                        return (
                            <div className='gallery-card' onClick={(e) => toGallery(e, gallery)} key={gallery.id}>
                            {gallery.photos && gallery.photos.length > 0 && (
                                <img src={gallery.photos[0].photoUrl} alt='gallery'></img>
                            )}

                        </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}
export default UserProfileGalleries
