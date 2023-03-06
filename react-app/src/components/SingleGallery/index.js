import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, NavLink, useHistory } from 'react-router-dom'
import { thunkLoadSingleGallery } from '../../store/gallery'
import OpenModalButton from '../OpenModalButton'
import SelectProfilePhotosModal from '../SelectProfilePhotosModal'
import './SingleGallery.css'
import { thunkDeleteGalleryPhoto } from '../../store/photo'


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
    if (!gallery.photos) return null
    const photos = (gallery.photos)



    const PhotoClick = (e, id) => {
        e.preventDefault()
        history.push(`/photos/${id}`)
    }
    const editGallery = () => {
        history.push(`/galleries/${gallery.id}/edit`)
    }
    const deleteFromGallery = (photo) => {
        dispatch(thunkDeleteGalleryPhoto(photo.id, gallery.id))
    }

    return (
        <div className='gallery-single-container'>
            {gallery.photos.length > 0 && (
                <img className='single-gallery-cover' style={{ objectFit: 'cover' }} src={gallery.photos[0].photoUrl} alt='gallery cover'></img>
            )}
            {gallery.photos.length === 0 && (
                <div className='single-gallery-cover image-size gallery-placeholder' ></div>
            )}

            <div className='edit-gallery-buttons'>
                {user && user.id === gallery.userId && (
                    <div className='single-gallery-edit-buttons'>
                        <OpenModalButton
                            className='add-to-gallery-modal'
                            buttonText=<i className="fa-regular fa-square-plus" style={{ fontSize: '22px', marginRight: '0px', marginTop: '1px' }}></i>
                            modalComponent={<SelectProfilePhotosModal gallery={gallery} />}
                        />

                        <button className='edit-gallery-button' onClick={editGallery}><i className="fa-regular fa-pen-to-square"></i></button>
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

            <div className='single-gallery-photo-container'>
                {user && photos.length === 0 && user.id === gallery.userId && (
                    <div className='add-photos-gallery-prompt'>
                        <div>
                            <i className="fa-regular fa-square-plus"></i>
                        </div>
                        <h2>Add photos to this Gallery</h2>
                        <p>Curate inspirational photos, or tell a story with your own photos.</p>
                        <OpenModalButton
                            className='add-to-gallery-button'
                            buttonText='Add photos from my Profile'
                            modalComponent={<SelectProfilePhotosModal gallery={gallery} />}
                        />
                    </div>
                )}
                {photos && photos.map((photo, index) => {
                    return (
                        <div className='photo-card' key={index} onClick={(e) => PhotoClick(e, photo.id)}>
                            <div className='image-overlay-3'>
                                <h4 className='overlay-3-text'>{photo.title}</h4>
                                {user && user.id === gallery.userId && (
                                    <button className='delete-from-gallery-button' onClick={(e) => { e.stopPropagation(); deleteFromGallery(photo) }}>
                                        <i className="fa-regular fa-trash-can"></i>
                                    </button>
                                )}

                            </div>
                            <img className='image-size' src={photo.photoUrl} alt='one in gallery'></img>
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
    )
}
export default SingleGallery
