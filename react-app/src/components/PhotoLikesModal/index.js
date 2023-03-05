
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { NavLink } from "react-router-dom"
import { useModal } from "../../context/Modal"
import { thunkLoadAllPhotoLikes } from "../../store/like"
import './PhotoLikesModal.css'

const PhotoLikesModal = ({ photoId }) => {
    const dispatch = useDispatch()
    const { closeModal } = useModal();

    useEffect(() => {
        dispatch(thunkLoadAllPhotoLikes(+photoId))
    }, [dispatch])

    const photoLikes = useSelector(state => state.likes.photoLikes)
    if (!photoLikes) return null
    const photoLikesArr = Object.values(photoLikes)

    return (
        <div className='photo-likes-modal-container'>
            <div className='exit-create-gallery-modal' onClick={closeModal}><i className="fa-solid fa-x"></i></div>
            <h1 className='photo-like-modal-header'>Likes {photoLikesArr.length}</h1>
            {photoLikesArr.length > 0 && photoLikesArr.map((photoLike) => {
                return (
                    <div key={photoLike.id} className='photo-like-container'>
                        <img className='small-profile-icon' style={{ marginRight: '5px' }} src={photoLike.userProfile} alt='profile'></img>
                        <NavLink to={`/profile/${photoLike.userId}`} className='photo-like-container-name' onClick={closeModal}>{photoLike.userFirstName} {photoLike.userLastName}</NavLink>
                    </div>
                )

            })}
        </div>

    )

}
export default PhotoLikesModal
