import { useEffect, useState } from "react"
import { useDispatch } from 'react-redux'
import { useHistory } from "react-router-dom"
import { useModal } from "../../context/Modal"
import { thunkCreateGallery } from "../../store/gallery"
import './CreateGalleryModal.css'

const CreateGalleryModal = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const { closeModal } = useModal()
    const [title, setTitle] = useState('')
    const [isPrivate, setIsPrivate] = useState(false)
    const [errors, setErrors] = useState([])
    const [createdGallery, setCreatedGallery] = useState('')


    const handleSubmit = async (e) => {
        e.preventDefault()
        setErrors([])

        const payload = {
            title,
            isPrivate,

        }
        const data = await dispatch(thunkCreateGallery(payload))

        if (Array.isArray(data)) {
            setErrors(data);
        } else {
            await setCreatedGallery(data)
            closeModal();
        }
    }
    useEffect(() => {
        if (createdGallery) {
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
                            name="isPrivate"
                            checked={isPrivate}
                            value={isPrivate}
                            onChange={(e) => setIsPrivate(e.target.checked)}
                        />
                    </div>
                </label>
            </form>
        </div>
    )
}
export default CreateGalleryModal
