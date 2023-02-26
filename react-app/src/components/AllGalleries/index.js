import { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from 'react-router-dom'
import { thunkLoadGalleries } from "../../store/gallery"
import './AllGalleries.css'

const AllGalleries = () => {
    const dispatch = useDispatch()
    const history = useHistory()

    useEffect(() => {
        dispatch(thunkLoadGalleries())
    },[dispatch])

    const allGalleriesObj = useSelector((state) => state.galleries.allGalleries)
    if (!allGalleriesObj) return null
    const galleries = Object.values(allGalleriesObj)

    const toGallery = (gallery) => {
        history.push(`/galleries/${gallery.id}`)
    }

    return (
        <div>
            <ul className='all-galleries'>
                {galleries.map((gallery) => {
                    return (
                        <div className='gallery-card' key={gallery.id} onClick={() => toGallery(gallery)}>
                            {gallery.photos && gallery.photos.length > 0 && (
                                <img className='photo-size' src={gallery.photos[0].photoUrl} alt='gallery'></img>
                            )}

                        </div>
                    )
                })}
            </ul>
            </div>
    )
}

export default AllGalleries
