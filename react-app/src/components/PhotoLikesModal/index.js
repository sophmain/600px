
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useModal } from "../../context/Modal"
import { thunkLoadAllLikes } from "../../store/like"

const PhotoLikesModal = ({ photoId }) => {
    const dispatch = useDispatch()
    const { closeModal } = useModal();

    useEffect(() => {
        dispatch(thunkLoadAllLikes(photoId))
    })

    const photoLikes = useSelector(state => state.likes.photoLikes)
    const photoLikesArr = Object.values(photoLikes)

    return (
        <>
            <h1 className='photo-like-modal-header'>Likes {photoLikesArr.length}</h1>
            {photoLikesArr.length > 0 && photoLikesArr.map((photoLike)=> {
                return (
                    <div key= {photoLike.id} className='photo-like-container'>
                        <img className='small-profile-icon' src={photoLike.userProfile} alt='profile'></img>
                        <div className='photo-like-container-name'>{photoLike.userFirstName} {photoLike.userLastName}</div>
                    </div>
                )

            })}
        </>

    )

}
export default PhotoLikesModal
