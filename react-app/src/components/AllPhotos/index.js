import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, NavLink } from 'react-router-dom'
import { thunkLoadPhotos } from '../../store/photo'
import CreateGalleryModal from '../CreateGalleryModal'
import AddToGalleryModal from '../AddToGalleryModal'
import OpenModalButton from '../OpenModalButton'
import './AllPhotos.css'
import { thunkGetAllUser } from '../../store/session'
import { thunkLoadAllLikes, thunkPostLike, thunkDeleteLike } from '../../store/like'

const AllPhotos = () => {
    const dispatch = useDispatch()
    const history = useHistory()

    useEffect(() => {
        dispatch(thunkLoadPhotos())
        dispatch(thunkGetAllUser())
        dispatch(thunkLoadAllLikes())

    }, [dispatch])

    const allPhotosObj = useSelector((state) => state.photos.allPhotos)
    const sessionUser = useSelector((state) => state.session.user)
    const allLikes = useSelector((state) => state.likes.allLikes)
    // const allUsers = useSelector((state) => state.session.allUsers)

    if (!allPhotosObj) return null

    const photos = Object.values(allPhotosObj)

    // takes user to the single photo page when clicking photo in all photos page
    const PhotoClick = (e, id) => {
        e.preventDefault()
        history.push(`/photos/${id}`)
    }

    if (!allLikes) return null
    return (
        <div className='mapped-photo-container'>
            <h1 className='photos-title'>Home Feed</h1>
            <h3 className='see-photos'>See photos and published Galleries.</h3>
            <div className='subheader-home'>
                <NavLink to={'/'} className='selected-subheader' style={{ marginRight: '15px' }}>Home</NavLink>
                <NavLink to={'/galleries'} className='not-selected-subheader'>Galleries</NavLink>
            </div>
            <ul className='all-photos' >
                {photos.map((photo) => {
                    const likesArr = Object.values(allLikes).filter((like) => like.photoId === photo.id)
                    const isLiked = likesArr.filter(like => like.userId === sessionUser?.id).length > 0
                    const likeId = likesArr.filter(like => like.userId === sessionUser?.id)[0]?.id

                    return (
                        <div className='photo-card' key={photo.id} onClick={(e) => PhotoClick(e, photo.id)}>
                            {/* <div className='all-photo-image'>
                                {setImageSize(photos, photo)}
                            </div> */}
                            <div className='image-overlay-2'>
                                <h4 className='overlay-2-text'>{photo.title}</h4>
                            </div>
                            <img className='photo-size' src={photo.photoUrl} alt='main page'></img>
                            <div className='image-overlay'>
                                <div className='overlay-2-text overlay-bottom-text'>
                                    <img className='small-profile-icon' src={photo.profilePhoto} alt='profile' style={{marginLeft: '5px'}}></img>
                                    <div style={{paddingLeft: '5px'}}>{photo.photoFirstName} {photo.photoLastName}</div>
                                </div>
                                {sessionUser && (
                                    <div className='overlay-right'>
                                        <div className='overlay-right-buttons'>
                                            {isLiked === false && (
                                                <button className='all-photo-notlike-button' onClick={(e) => {dispatch(thunkPostLike(photo.id, sessionUser.id)); e.stopPropagation() }}><i className="fa-regular fa-heart"></i></button>
                                            )}
                                            {isLiked === true && (
                                                <button className='all-photo-like-button' onClick={(e) => { dispatch(thunkDeleteLike(likeId)); e.stopPropagation() }}><i className="fa-solid fa-heart heart-liked-color"></i></button>
                                            )}
                                            <div className='gallery-modal-button' onClick={e => e.stopPropagation()}>
                                                <OpenModalButton
                                                    className='add-gallery-modal'
                                                    buttonText='+'
                                                    modalComponent={<AddToGalleryModal photo={photo} />}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                )}

                            </div>
                        </div>
                    )
                })}

            </ul>

        </div>
    )
}

export default AllPhotos
