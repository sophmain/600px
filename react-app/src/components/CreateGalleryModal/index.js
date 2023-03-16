import { useEffect, useState } from "react"
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from "react-router-dom"
import { useModal } from "../../context/Modal"
import { thunkCreateGallery } from "../../store/gallery"
import { thunkPostPhotoGallery } from "../../store/photo"
import './CreateGalleryModal.css'

const CreateGalleryModal = ({ photo }) => {
    const dispatch = useDispatch()
    const history = useHistory()
    const { closeModal } = useModal()
    const [title, setTitle] = useState('')
    const [visible, setVisible] = useState(false)
    const [errors, setErrors] = useState([])
    const [createdGallery, setCreatedGallery] = useState('')
    //const [photo, setPhoto] = useState([])

    console.log('visible', visible)
    const user = useSelector(state => state.session.user)
    //const photo = useSelector(state => state.photos.singlePhoto)
    //const galleries = useSelector(state => state.galleries.allGalleries)
    //const numGallery = galleries.length()


    const handleSubmit = async (e) => {
        e.preventDefault()
        setErrors([])
        const description = '' //empty for modal, can add from form

        const payload = {
            userId: user.id,
            title,
            visible: !visible,
            description,
            // photos: [{...photo}]
        }


        const data = await dispatch(thunkCreateGallery(payload))

        if (Array.isArray(data)) {
            // const formattedData = data.map((data) => data.split(': ')[1])
            setErrors(data)
        } else {
            await setCreatedGallery(data)

            // await dispatch(thunkPostPhotoGallery(createdGallery.id, [photo]))
            closeModal();
        }
    }
    useEffect(() => {
        if (createdGallery) {

            dispatch(thunkPostPhotoGallery(createdGallery.id, [photo.id]))
            history.push(`/galleries/${createdGallery.id}`)
        }
    }, [createdGallery])


    return (
        <div className='create-gallery-modal-container'>
            <h1 className='add-to-gallery-header'>Add to Gallery</h1>
            <h2 className='create-new-gallery-header'>Create new gallery</h2>
            <form className='create-gallery-modal-form' onSubmit={handleSubmit}>
                <label >
                    <p className='create-gallery-modal-label'>
                        Title*
                    </p>
                    <input
                        className='create-gallery-modal-title-input'
                        id="title"
                        type="text"
                        name="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <div className='errors-profile-edit'>
                        {errors.filter((error) => error.includes('title')).length > 0 ? errors.filter((error) => error.includes('title'))[0].split(': ')[1] : ''}
                    </div>
                </label>
                <label>
                    <div className="gallery-checkbox">
                        <p className="input-label-gallery">
                            Private
                        </p>
                        <input
                            className="input-box-gallery"
                            id="checkbox"
                            type="checkbox"
                            name="visible"
                            checked={visible}
                            value={visible}
                            onChange={(e) => setVisible(e.target.checked)}
                        />
                    </div>
                </label>
                <div className='create-gallery-modal-cancel-create'>
                    <button className='create-gallery-cancel-button' onClick={closeModal}>Cancel</button>
                    <button className="create-gallery-modal-submit-button" type="submit">Create and add</button>
                </div>

            </form>
        </div>
    )
}
export default CreateGalleryModal
