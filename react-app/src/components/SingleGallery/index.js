

import { useDebugValue, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import { thunkLoadSingleGallery } from '../../store/gallery'
import { thunkLoadPhotos } from '../../store/photo'
import './SingleGallery.css'

const SingleGallery = () => {
    const { galleryId } = useParams()
    const dispatch = useDispatch()
    // const history = useHistory()

    useEffect(() => {
        dispatch(thunkLoadSingleGallery(galleryId))
        dispatch(thunkLoadPhotos())
    }, [dispatch, galleryId])

    const gallery = useSelector((state) => state.galleries.singleGallery)
    const photosObj = useSelector((state) => state.photos.allPhotos)
    if (!gallery) return null
    if (!photosObj) return null
    const photos = Object.values(photosObj)
    const galleryPhotos = photos.filter(photo => photo.galleryId == gallery.id)

    return (
        <div>
            <ul>
                {galleryPhotos.map((galleryPhoto) => {
                    return (
                        <img className='photo-size' src={galleryPhoto.photoUrl} alt='gallery img'></img>
                    )
                })}
            </ul>
        </div>
    )
}
export default SingleGallery
