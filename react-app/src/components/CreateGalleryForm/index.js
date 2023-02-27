import { useEffect, useState } from "react"
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from "react-router-dom"
import { thunkCreateGallery } from "../../store/gallery"
import './CreateGalleryForm.css'

const CreateGalleryForm = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const [title, setTitle] = useState('')
    const [visible, setVisible] = useState(false)
    const [description, setDescription] = useState('')
    const [errors, setErrors] = useState([])
    const [createdGallery, setCreatedGallery] = useState('')
    //const [photo, setPhoto] = useState([])


    const user = useSelector(state => state.session.user)
    //const photo = useSelector(state => state.photos.singlePhoto)
    //const galleries = useSelector(state => state.galleries.allGalleries)
    //const numGallery = galleries.length()


    const handleSubmit = async (e) => {
        e.preventDefault()
        setErrors([])
        const description= '' //empty for modal, can add from form

        const payload = {
            userId: user.id,
            title,
            description,
            visible,
            description,
        }


        const data = await dispatch(thunkCreateGallery(payload))

        if (Array.isArray(data)) {
            setErrors(data);
        } else {
            await setCreatedGallery(data)
        }
    }
    useEffect(() => {
        if (createdGallery) {
            history.push(`/galleries/${createdGallery.id}`)
        }
    }, [createdGallery])


    return (
        <div className='create-gallery-form-container'>
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
                    <p>
                        Description
                    </p>
                    <textarea
                        id="description"
                        type="textarea"
                        name="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </label>
                <label>
                    <div className='visible-container'>
                        <input
                            id="visible"
                            type="radio"
                            checked={visible == true}
                            name="visible"
                            onChange={(e) => setVisible(true)}
                            value={true}
                        /><p className='button-text'>Visible to everyone</p>
                    </div>
                    <div className='visible-container'>
                        <input
                            id="notvisible"
                            type="radio"
                            checked={visible == false}
                            name="notvisible"
                            onChange={(e) => setVisible(false)}
                            value={false}
                        /><p className='button-text'>Only visible to me</p>
                    </div>
                </label>
                <button className="create-gallery-submit-button" type="submit">Submit</button>
            </form>
        </div>
    )
}
export default CreateGalleryForm
