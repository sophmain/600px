import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { thunkLoadSingleGallery } from '../../store/gallery'
import './SingleGallery.css'

const SingleGallery = () => {

    const { galleryId } = useParams()
    const dispatch = useDispatch()

    useEffect(()=> {
        dispatch(thunkLoadSingleGallery(galleryId))
    }, [dispatch])

    const gallery = useSelector((state) => state.galleries.singleGallery)
    if (!gallery) return (<h1>hi</h1>)
    const photos = (gallery.photos)

    return (
        <div className='gallery-all-container'>
            <h1>{gallery.title}</h1>
            {photos.map((photo) => {
                return (
                    <img src={photo.photoUrl}></img>
                )
            })}
        </div>
    )
}
export default SingleGallery
