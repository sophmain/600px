import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory, useParams } from "react-router-dom"
import { actionCleanUpPhoto, thunkLoadSinglePhoto } from "../../store/photo"
import './SinglePhoto.css'

const SinglePhoto = () => {

    const { photoId } = useParams()
    const dispatch = useDispatch()
    const history = useHistory()

    useEffect(() => {
        dispatch(thunkLoadSinglePhoto(photoId))
        //return () => dispatch(actionCleanUpPhoto())

    }, [dispatch, photoId])

    const user = useSelector((state) => state.session.user)
    const photo = useSelector((state) => state.photos.singlePhoto)
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
        <div className='page-background'>
            <div className='photo-background'>
                <div className='single-photo-container'>
                    <div className='single-photo-nav' onClick={prevPhoto}><i className="fa-solid fa-chevron-left"></i></div>
                    <div className='single-photo-size'>
                        <img className='single-photo' src={photo.photoUrl}></img>
                    </div>
                    <div className='single-photo-nav' onClick={nextPhoto}><i className="fa-solid fa-chevron-right"></i></div>
                </div>
            </div>
            <div className='single-lower-container'>
                <div className='single-photo-about-container'>
                    {user && user.id === photo.userId && (
                        <div className='single-photo-edit-buttons'>
                            <button className='edit-photo-button' onClick={editPhoto}><i class="fa-regular fa-pen-to-square"></i></button>
                        </div>
                    )}
                    <div className='single-photo-profile-info'>
                        <div className='single-left-right-profile'>
                            <div className='single-right-profile'>
                                <h2 className='single-photo-title'>{photo.title}</h2>
                                <div className='single-photo-owner'>by {photo.uploadedFirstName} {photo.uploadedLastName}</div>
                            </div>
                        </div>
                    </div>
                    <div className='single-location'>
                        
                    </div>
                    <div className='single-taken-updated'>
                        <p className='single-taken'>Taken: </p>
                        <p className='single-taken-data'>{photo.takenDate.slice(0, 10)}</p>
                        <p className='single-taken'>Uploaded:</p>
                        <p className='single-taken-data'>{photo.uploadDate.slice(0, 16)}</p>
                    </div>
                    <div className='single-camera-info'>
                    <img className='lense-photo' src='https://cdn-icons-png.flaticon.com/512/4584/4584897.png' alt='camera'></img>
                        <p className='camera-type-text'>{photo.cameraType}</p>
                    </div>
                    <div className='single-lense-info'>
                        <img className='lense-photo' src='https://as2.ftcdn.net/jpg/02/49/90/21/160_F_249902158_Nngbp2SO00lZyvnhEhXG4S2LtOaJDx5R.jpg' alt='lense'></img>
                        {photo.lenseType}
                    </div>
                    <div className='single-category'>
                        Category: {photo.category}
                    </div>

                </div>
            </div>
        </div>


    )
}

export default SinglePhoto
