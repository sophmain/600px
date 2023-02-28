import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, NavLink } from 'react-router-dom'
import { thunkLoadPhotos } from '../../store/photo'
import CreateGalleryModal from '../CreateGalleryModal'
import AddToGalleryModal from '../AddToGalleryModal'
import OpenModalButton from '../OpenModalButton'
import './AllPhotos.css'

const AllPhotos = () => {
    const dispatch = useDispatch()
    const history = useHistory()

    useEffect(() => {
        dispatch(thunkLoadPhotos())
    }, [dispatch])

    const allPhotosObj = useSelector((state) => state.photos.allPhotos)

    if (!allPhotosObj) return null

    const photos = Object.values(allPhotosObj)

    // takes user to the single photo page when clicking photo in all photos page
    const PhotoClick = (e, id) => {
        e.preventDefault()
        history.push(`/photos/${id}`)
    }


    // function randomImageSize(min, max) {
    //     return Math.round(Math.random() * (max - min) + min)
    // }
    // function setImageSize(photos, photo) {
    //     let images = ''
    //     for (let i = 0; i < photos.length; i++) {
    //         let width = randomImageSize(200, 1000);
    //         let height = randomImageSize(200, 500);
    //         images += `<img src=${photo.photoUrl} + ${width} + '/' + ${height} + '"alt="grid">`
    //     }
    // }

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
                                    {photo.photoFirstName} {photo.photoLastName}
                                </div>
                                <div className='overlay-right'>
                                    <button className='gallery-modal-button' onClick={e => e.stopPropagation()}>
                                        <OpenModalButton
                                            className='add-gallery-modal'
                                            buttonText='+'
                                            modalComponent={<AddToGalleryModal photo={photo} />}
                                        />
                                    </button>


                                </div>
                            </div>
                        </div>
                    )
                })}

            </ul>

        </div>
    )
}

export default AllPhotos
