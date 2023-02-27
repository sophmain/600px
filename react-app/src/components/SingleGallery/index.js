import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, NavLink, useHistory } from 'react-router-dom'
import { thunkLoadSingleGallery } from '../../store/gallery'
import './SingleGallery.css'

const SingleGallery = () => {

    const { galleryId } = useParams()
    const dispatch = useDispatch()
    const history = useHistory()

    useEffect(() => {
        dispatch(thunkLoadSingleGallery(galleryId))
    }, [dispatch])

    const gallery = useSelector((state) => state.galleries.singleGallery)
    const user = useSelector((state) => state.session.user)

    if (!gallery) return null
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
            <div className='single-gallery-photo-container'>
                {photos.map((photo) => {
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
