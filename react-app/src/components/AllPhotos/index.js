import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, NavLink } from 'react-router-dom'
import { thunkLoadPhotos } from '../../store/photo'
import AddToGalleryModal from '../AddToGalleryModal'
import OpenModalButton from '../OpenModalButton'
import './AllPhotos.css'
import { thunkLoadAllLikes, thunkPostLike, thunkDeleteLike } from '../../store/like'

const AllPhotos = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    // Load photos and likes data on component mount
    useEffect(() => {
        dispatch(thunkLoadPhotos());
        dispatch(thunkLoadAllLikes());
    }, [dispatch]);

    // Get photo and user data from store
    const allPhotosObj = useSelector((state) => state.photos.allPhotos);
    const sessionUser = useSelector((state) => state.session.user);

    // Filter likes to only include those for the current session user
    const allLikes = useSelector((state) => {
        if (state.likes.allLikes) {
            return Object.values(state.likes.allLikes).filter(
                (like) => like.userId === sessionUser?.id
            );
        }
        return null;
    });

    // Redirect to the single photo page when a photo is clicked
    const handlePhotoClick = (id) => {
        history.push(`/photos/${id}`);
    };

    return (
        <div className='mapped-photo-container'>
            <h1 className='photos-title'>Home Feed</h1>
            <h3 className='see-photos'>See photos and published Galleries.</h3>
            <div className='subheader-home'>
                <NavLink to={'/'} className='selected-subheader' style={{ marginRight: '15px' }}>
                    Home
                </NavLink>
                <NavLink to={'/galleries'} className='not-selected-subheader'>
                    Galleries
                </NavLink>
            </div>
            <ul className='all-photos'>
                {/* Map through photos and display them */}
                {allPhotosObj &&
                    Object.values(allPhotosObj).map((photo) => {
                        // Filter likes for this photo
                        const likesArr = allLikes?.filter((like) => like.photoId === photo.id);
                        // Check if the session user has already liked the photo
                        const isLiked = likesArr?.length > 0;
                        // Get the id of the like, if it exists
                        const likeId = likesArr?.[0]?.id;

                        return (
                            <div className='photo-card' key={photo.id} onClick={() => handlePhotoClick(photo.id)}>
                                <div className='image-overlay-2'>
                                    <h4 className='overlay-2-text'>{photo.title}</h4>
                                </div>
                                <img className='photo-size' src={photo.photoUrl} alt='main page'></img>
                                <div className='image-overlay'>
                                    <div className='overlay-2-text overlay-bottom-text'>
                                        <img
                                            className='small-profile-icon'
                                            src={photo.profilePhoto}
                                            alt='profile'
                                            style={{ marginLeft: '5px' }}
                                        ></img>
                                        <div style={{ paddingLeft: '5px' }}>
                                            {photo.photoFirstName} {photo.photoLastName}
                                        </div>
                                    </div>
                                    {/* Show like/unlike button and add to gallery button if user is logged in */}
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
                    })}

            </ul>

        </div>
    )
}

export default AllPhotos
