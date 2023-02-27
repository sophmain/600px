import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom";
import { useModal } from "../../context/Modal";
import { thunkLoadPhotos, thunkPostPhotoGallery } from "../../store/photo";
import './SelectProfilePhotosModal.css'

const SelectProfilePhotosModal = ({ galleryId }) => {
    const dispatch = useDispatch()
    const { closeModal } = useModal();

    const [selectedPhotos, setSelectedPhotos] = useState([])
    const [errors, setErrors] = useState([])
    const [clickBorder, setClickBorder] = useState('border-click-off')
    // const [selectedPhotos, setSelectedPhotos] = useState([])

    useEffect(() => {
        dispatch(thunkLoadPhotos())
    }, [dispatch])

    const user = useSelector((state) => state.session.user)
    const photosObj = useSelector((state) => state.photos.allPhotos)
    if (!photosObj) return null
    const photosArr = Object.values(photosObj)

    const myPhotos = photosArr.filter((photo) => photo.userId == user.id)

    let selectedPhotosId = selectedPhotos
    const addPhoto = (e, photo) => {
        e.preventDefault()
        // setIsSelected([selet])
        // console.log('is selected?', isSelected)
        if (!selectedPhotosId.includes(+photo.id)){
            console.log(selectedPhotosId.includes(+photo.id))
            // setSelectedPhotos([...selectedPhotos, photo.id])
            console.log('selected before add', selectedPhotosId)
            selectedPhotosId.push(photo.id)
            // selectedPhotos.push(photo)
            setSelectedPhotos(selectedPhotosId)
            console.log('selected after add', selectedPhotosId)
        } else {
            selectedPhotosId.splice(selectedPhotosId.indexOf(photo.id), 1)
            setSelectedPhotos(selectedPhotosId)
        }
        // } else {
        //     let index = 0
        //     for (let selectedPhoto of selectedPhotos) {
        //         console.log('selected id', selectedPhoto.id)
        //         if (photo.id == selectedPhoto.id){
        //             index = selectedPhotos.indexOf(selectedPhoto)
        //             console.log('index', index)
        //         }
        //     }
        //     selectedPhotos.splice(index, 1)

        // }
        // return selectedPhotos
        // setClickBorder(`border-click-on {photo.id}`)

    }
    console.log('SELECTED', selectedPhotos)
    const handleSubmit = async (e) => {
        e.preventDefault()
        setErrors([])

        await dispatch(thunkPostPhotoGallery(galleryId, selectedPhotos))


        closeModal();

    }


    return (


        <div className='photos-modal-container'>
            <h1>Select photos</h1>
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
                                <button className={clickBorder} onClick={(e) => addPhoto(e, photo)}>
                                    <img className='my-modal-photo' src={photo.photoUrl} alt='my photo'></img>
                                </button>

                            </div>
                        )
                    })}
                </div>

                <button className='add-photos-gallery-button' type="submit">Add photos</button>
            </form>
        </div>
    )

}
export default SelectProfilePhotosModal
