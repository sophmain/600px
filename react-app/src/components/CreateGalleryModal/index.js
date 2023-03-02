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


    const user = useSelector(state => state.session.user)
    //const photo = useSelector(state => state.photos.singlePhoto)
    //const galleries = useSelector(state => state.galleries.allGalleries)
    //const numGallery = galleries.length()
    console.log('PHOTO', photo)

    const handleSubmit = async (e) => {
        e.preventDefault()
        setErrors([])
        const description= '' //empty for modal, can add from form

        const payload = {
            userId: user.id,
            title,
            visible,
            description,
            // photos: [{...photo}]
        }


        const data = await dispatch(thunkCreateGallery(payload))
        console.log('data in handlesubmit', data)


        if (Array.isArray(data)) {
            const formattedData = data.map((data) => data.split(': ')[1])
            setErrors(formattedData)
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
            <h1>Create gallery</h1>
            <form className='gallery-form' onSubmit={handleSubmit}>
                <ul className="validation-errors">
                    {errors.map((error, idx) => (
                        <li key={idx}>{error}</li>
                    ))}
                </ul>
                <label>
                    <p>
                        Title*
                    </p>
                    <input
                        id="title"
                        type="text"
                        name="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
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
                <button className="create-gallery-submit-button" type="submit">Submit</button>
            </form>
        </div>
    )
}
export default CreateGalleryModal
