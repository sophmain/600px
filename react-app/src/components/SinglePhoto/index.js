import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { actionCleanUpPhoto, thunkLoadSinglePhoto } from "../../store/photo"


const SinglePhoto = () => {

    const { photoId } = useParams()
    const dispatch = useDispatch()

    useEffect(()=> {
        dispatch(thunkLoadSinglePhoto(photoId))
        return () => dispatch(actionCleanUpPhoto())

    }, [dispatch, photoId])

    const photo = useSelector((state) => state.photos.singlePhoto)
    if (!photo) return null

    return (
        <div>
            <img className='photo-size' src={photo.photoUrl}></img>
        </div>
    )
}

export default SinglePhoto
