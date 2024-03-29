
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useModal } from "../../context/Modal";
import { thunkLoadPhotos, thunkPostPhotoGallery } from "../../store/photo";
import './SelectProfilePhotosModal.css'

const SelectProfilePhotosModal = ({ gallery }) => {
    const dispatch = useDispatch()
    const { closeModal } = useModal();

    const [selectedPhotos, setSelectedPhotos] = useState([])
    const [errors, setErrors] = useState([])
    const [clickBorder, setClickBorder] = useState({})
    // const [selectedPhotos, setSelectedPhotos] = useState([])

    useEffect(() => {
        dispatch(thunkLoadPhotos())
    }, [dispatch])

    const user = useSelector((state) => state.session.user)
    const photosObj = useSelector((state) => state.photos.allPhotos)

    if (!photosObj) return null
    const photosArr = Object.values(photosObj)


    const myPhotos = photosArr.filter((photo) => photo.userId === user.id && !gallery.photos.map(galleryphoto => galleryphoto.id).includes(photo.id))


    const addPhoto = (e, photo) => {
        e.preventDefault()

        const updatedSelectedPhotos = (selectedPhotos.includes(+photo.id))
        ? selectedPhotos.filter((id)=> id !== photo.id) // filters out photo if it is already selected (unselect photo)
        : [...selectedPhotos, photo.id]
        setSelectedPhotos(updatedSelectedPhotos)

        setClickBorder((prevClickBorder) => {
            const updatedClickBorder = { ...prevClickBorder };
            if (selectedPhotos.includes(+photo.id)) {
              delete updatedClickBorder[photo.id];

            } else {
              updatedClickBorder[photo.id] = "border-click-on";

            }
            return updatedClickBorder;
          });

    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setErrors([])

        await dispatch(thunkPostPhotoGallery(gallery.id, selectedPhotos))

        closeModal();

    }


    return (


        <div className='photos-modal-container'>
            <h1 className='select-photos-modal-title'>Select photos</h1>
            <form onSubmit={handleSubmit}>
                {errors.length > 0 && (
                    <ul>
                        {errors.map((error, idx) => (
                            <li key={idx}>{error}</li>
                        ))}
                    </ul>
                )}
                <div className='photos-mapped-modal'>
                    {myPhotos.map((photo) => {
                        return (
                            <div className='my-modal-photo-container' key={photo.id}>
                                <button className={`my-modal-photo-button ${clickBorder[photo.id] || ""}`} onClick={(e) => addPhoto(e, photo)}>
                                    <img className='my-modal-photo' src={photo.photoUrl} alt='users upload'></img>
                                </button>

                            </div>
                        )
                    })}
                </div>

                <button className='add-photos-gallery-button' type="submit">Add selected</button>
            </form>
        </div>
    )

}
export default SelectProfilePhotosModal
