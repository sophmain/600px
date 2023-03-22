import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import AddToGalleryModal from '../AddToGalleryModal'
import OpenModalButton from '../OpenModalButton'
import { thunkGetAllUser } from '../../store/session'
import { thunkLoadAllLikes, thunkPostLike, thunkDeleteLike } from '../../store/like'
import './Search.css'

const Search = () => {
    const history = useHistory()
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(thunkGetAllUser())
        dispatch(thunkLoadAllLikes())

    }, [dispatch])

    const searchRes = useSelector((state) => state.search)
    const sessionUser = useSelector((state) => state.session.user)
    const allLikes = useSelector((state) => state.likes.allLikes)
    if (!searchRes) return null

    const searchArr = Object.values(searchRes)
    if (!searchArr.length) return <h1 className='search-title' style={{padding: '0px 64px', fontSize: '36px', margin: '24px 0px 8px'}}>No search results</h1>

    // takes user to the single photo page when clicking photo in all photos page
    const PhotoClick = (e, id) => {
        e.preventDefault()
        history.push(`/photos/${id}`)
    }

    if (!allLikes) return null
    return searchRes && (
        <div className='all-search-container'>
            <h4 className='search-subheader'>{searchArr.length} photos</h4>

            <div className='user-photos-container'>
                <div className='user-photos-mapped'>
                    {searchArr.map((photo) => {
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
                                        <img className='small-profile-icon' src={photo.profilePhoto} alt='profile' style={{ marginLeft: '5px' }}></img>
                                        <div style={{ paddingLeft: '5px' }}>{photo.uploadedFirstName} {photo.uploadedLastName}</div>
                                    </div>
                                    {sessionUser && (
                                        <div className='overlay-right'>
                                            <div className='overlay-right-buttons'>
                                                {isLiked === false && (
                                                    <button className='all-photo-notlike-button' onClick={(e) => { dispatch(thunkPostLike(photo.id, sessionUser.id)); e.stopPropagation() }}><i className="fa-regular fa-heart"></i></button>
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
                    })
                    }
                </div>
            </div>
        </div>
    )
}



export default Search;
