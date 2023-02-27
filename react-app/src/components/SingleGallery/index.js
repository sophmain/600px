import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, NavLink, useHistory } from 'react-router-dom'
import { thunkLoadSingleGallery } from '../../store/gallery'
import OpenModalButton from '../OpenModalButton'
import SelectProfilePhotosModal from '../SelectProfilePhotosModal'
import './SingleGallery.css'


const SingleGallery = () => {

    const { galleryId } = useParams()
    const dispatch = useDispatch()
    const history = useHistory()

    const galleryPhotos = useSelector((state) => state.photos.galleryPhotos)
    
    useEffect(() => {
        dispatch(thunkLoadSingleGallery(galleryId))
    }, [dispatch, galleryPhotos])

    const gallery = useSelector((state) => state.galleries.singleGallery)
    const user = useSelector((state) => state.session.user)


    if (!gallery) return null
    if(!gallery.photos) return null
    const photos = (gallery.photos)


    const PhotoClick = (e, id) => {
        e.preventDefault()
        history.push(`/photos/${id}`)
    }
    const editGallery = () => {
        history.push(`/galleries/${gallery.id}/edit`)
    }

    return (
        <div className='gallery-single-container'>
            {gallery.photos.length > 0 && (
                <img className='single-gallery-cover image-size' src={gallery.photos[0].photoUrl} alt='gallery cover'></img>
            )}
            {gallery.photos.length == 0 && (
                <div className='single-gallery-cover image-size gallery-placeholder' ></div>
            )}

            <div className='edit-gallery-buttons'>
                {user && user.id === gallery.userId && (
                    <div className='single-gallery-edit-buttons'>
                        <button className='edit-gallery-button' onClick={editGallery}><i class="fa-regular fa-pen-to-square"></i></button>
                    </div>
                )}
            </div>
            <h1 className='single-gallery-title'>{gallery.title} | Gallery</h1>
            <p className='single-gallery-description'>{gallery.description}</p>
            <img className='single-gallery-prof-photo' src={gallery.userProf} alt='user prof'></img>
            <p style={{ margin: '10px 0px 40px 0px' }}>Curated by
                <button className='to-profile-button' onClick={(e) => e.stopPropagation()}>
                    <NavLink className='all-gallery-to-profile' to={`/profile/${gallery.userId}`}>  {gallery.userFirstName} {gallery.userLastName}</NavLink>
                </button>
            </p>
            {photos.length == 0 && (
                    <div className='add-photos-gallery-prompt'>
                        <div>
                            <i className="fa-regular fa-square-plus"></i>
                        </div>
                        <h2>Add photos to this Gallery</h2>
                        <p>Curate inspirational photos, or tell a story with your own photos.</p>
                        <OpenModalButton
                            className='add-to-gallery-modal'
                            buttonText='Add photos from my Profile'
                            modalComponent={<SelectProfilePhotosModal galleryId={galleryId} />}
                        />
                    </div>
                )}
            <div className='single-gallery-photo-container'>

                {photos && photos.map((photo) => {
                    return (
                        <div className='photo-card' key={photo.id} onClick={(e) => PhotoClick(e, photo.id)}>
                            <img className='image-size' src={photo.photoUrl}></img>
                        </div>
                    )
                })}
            </div>

        </div>
    )
}
export default SingleGallery
