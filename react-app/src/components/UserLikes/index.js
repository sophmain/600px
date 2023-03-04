import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, NavLink } from "react-router-dom";
import { thunkLoadAllLikes } from "../../store/like";
import { thunkLoadPhotos } from "../../store/photo";
import './UserLikes.css'

const UserLikes = () => {
    const dispatch = useDispatch()
    const history = useHistory()

    useEffect(() => {
        dispatch(thunkLoadAllLikes())
        dispatch(thunkLoadPhotos())
    }, [dispatch])

    const allLikes = useSelector((state) => state.likes.allLikes)
    const user = useSelector((state) => state.session.user)
    const photos = useSelector((state) => state.photos.allPhotos)

    if (!allLikes) return null
    const userLikes = Object.values(allLikes).filter((like) => like.userId === user.id)
    const userLikeImgIds = []
    userLikes.forEach((like) => userLikeImgIds.push(like.photoId))

    if (!photos) return null
    const photosArr = Object.values(photos).filter((photo) => userLikeImgIds.includes(photo.id))

    // navigate to single photo page
    const toSinglePhoto = (photoId) => {
        history.push(`/photos/${photoId}`)
    }

    return (
        <>
            <h1 className='liked-photos-header'>
                Liked Photos
            </h1>
            <div className='user-photos-container'>

                <div className='user-photos-mapped'>
                    {userLikes.length > 0 && photosArr.map((photo) => {
                        return (
                            <img key={photo.id} className=' image-size user-mapped-liked-photo' src={photo.photoUrl} alt='liked' onClick={() => toSinglePhoto(photo.id)} style={{ cursor: 'pointer' }}></img>
                        )
                    })}
                    {userLikes.length === 0 && (
                        <div className='no-liked-prompt'>
                            <h3>No likes yet</h3>
                            <NavLink to={'/'} className='likes-discover-photos-button'>Discover photos</NavLink>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}
export default UserLikes
