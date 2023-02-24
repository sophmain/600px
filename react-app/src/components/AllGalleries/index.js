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

    return (
        <div>
            <ul className='all-galleries'>
                {galleries.map((gallery) => {
                    return (
                        <div className='gallery-card' key={gallery.id}>
                            {gallery.name}
                        </div>
                    )
                })}
            </ul>
            </div>
    )
}

export default AllGalleries
