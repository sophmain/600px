import { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { thunkLoadGalleries } from "../../store/gallery"


const AllGalleries = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(thunkLoadGalleries())
    },[dispatch])

    const allGalleriesObj = useSelector((state) => state.galleries.allGalleries)
    if (!allGalleriesObj) return null
    const galleries = Object.values(allGalleriesObj)
    console.log('gallery photos', galleries[0].photos[0])

    return (
        <div>
            <ul className='all-galleries'>
                {galleries.map((gallery) => {
                    return (
                        <div className='gallery-card' key={gallery.id}>
                            {gallery.photos && gallery.photos.length > 0 && (
                                <img src={gallery.photos[0].photoUrl} alt='gallery'></img>
                            )}

                        </div>
                    )
                })}
            </ul>
            </div>
    )
}

export default AllGalleries
