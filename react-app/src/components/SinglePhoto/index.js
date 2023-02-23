import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory, useParams } from "react-router-dom"
import { actionCleanUpPhoto, thunkLoadSinglePhoto } from "../../store/photo"
import './SinglePhoto.css'

const SinglePhoto = () => {

    const { photoId } = useParams()
    const dispatch = useDispatch()
    const history = useHistory()
    //const photoId = useSelector((state) => state.photos.photoId)

    useEffect(() => {
        dispatch(thunkLoadSinglePhoto(photoId))
        //return () => dispatch(actionCleanUpPhoto())

    }, [dispatch, photoId])


    const photo = useSelector((state) => state.photos.singlePhoto)
    console.log('>>>>>>>>>>.PHOTO', photo)
    if (!photo) return null

    const editPhoto = () => {
        history.push(`/manage/${photo.id}`)
    }
    const prevPhoto = () => {
        if (photo.id != 1) {
            history.push(`/photos/${photo.id - 1}`)
        }
    }
    const nextPhoto = () => {
        history.push(`/photos/${photo.id + 1}`)
    }
    // const isoDate = () => {
    //     return photo.uploadDate.toISOString().split('T')[0]
    // }

    return (
        <div>
            <div className='photo-background'>
                <div className='single-photo-container'>
                    <div className='single-photo-nav' onClick={prevPhoto}><i className="fa-solid fa-chevron-left"></i></div>
                    <div className='single-photo-size'>
                        <img className='single-photo' src={photo.photoUrl}></img>
                    </div>
                    <div className='single-photo-nav' onClick={nextPhoto}><i className="fa-solid fa-chevron-right"></i></div>
                </div>
            </div>

            <div className='single-photo-about-container'>
                <div className='single-photo-edit-buttons'>
                    <button className='edit-photo-button' onClick={editPhoto}>Edit</button>
                </div>
                <div className='single-photo-profile-info'>
                    <div className='single-left-right-profile'>
                        <div className='single-right-profile'>
                            <h2 className='single-photo-title'>{photo.title}</h2>
                            <div className='single-photo-owner'>by {photo.uploadedFirstName}{photo.uploadedLastName}</div>
                        </div>
                    </div>
                </div>
                <div className='single-taken-updated'>
                    <p>Taken: {photo.takenDate.slice(0,10)}</p>
                    <p>Uploaded: {photo.uploadDate}</p>
                </div>
                <div className='single-camera-info'>
                    {photo.cameraType}
                </div>
                <div className='single-lense-info'>
                    {photo.lenseType}
                </div>
                <div className='single-category'>
                    Category: {photo.category}
                </div>

            </div>

        </div>
    )
}

export default SinglePhoto
