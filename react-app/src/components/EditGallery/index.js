
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import { thunkDeleteGallery, thunkEditGallery, thunkLoadSingleGallery } from '../../store/gallery'
import './EditGallery.css'

const EditGallery = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const { galleryId } = useParams()


    useEffect(() => {
        dispatch(thunkLoadSingleGallery(galleryId))
    }, [dispatch, galleryId])

    const galleryEdit = useSelector((state) => state.galleries.singleGallery)
    const user = useSelector((state) => state.session.user)

    const [title, setTitle] = useState(galleryEdit?.title)
    const [description, setDescription] = useState(galleryEdit?.description)
    const [visible, setVisible] = useState(galleryEdit?.visible)
    const [errors, setErrors] = useState([])


    const handleSubmit = async (e) => {
        e.preventDefault()
        setErrors([])

        const payload = {
            id: galleryEdit.id,
            userId: user.id,
            title,
            visible,
            description,
            // photos: [{...photo}]
        }
        if (!user) return null

        const data = await dispatch(thunkEditGallery(payload))

        if (Array.isArray(data)) {
            setErrors(data);
        } else {
            history.push(`/galleries/${payload.id}`)
        }
    }

    const deleteGallery = (e) => {
        e.preventDefault()
        dispatch(thunkDeleteGallery(galleryEdit))
        history.push(`/profile/${user.id}/galleries`)
    }

    if (!galleryEdit) return null
    return (
        <div>
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
                <button className='delete-gallery-button' onClick={deleteGallery}>Delete</button>
                <button className="edit-gallery-submit-button" type="submit">Submit</button>
            </form>
        </div>
    )
}
export default EditGallery
