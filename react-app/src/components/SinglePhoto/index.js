import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory, useParams } from "react-router-dom"
import { actionCleanUpPhoto, thunkLoadSinglePhoto } from "../../store/photo"


const SinglePhoto = () => {

    const { photoId } = useParams()
    const dispatch = useDispatch()
    const history = useHistory()

    useEffect(()=> {
        dispatch(thunkLoadSinglePhoto(photoId))
        return () => dispatch(actionCleanUpPhoto())

    }, [dispatch, photoId])

    const photo = useSelector((state) => state.photos.singlePhoto)
    if (!photo) return null

    const editPhoto = () => {
        history.push('/post')
    }

    return (
        <div>
            <img className='photo-size' src={photo.photoUrl}></img>
            <button className='edit-photo-button' onClick={editPhoto}>Edit</button>
        </div>
    )
}

export default SinglePhoto
