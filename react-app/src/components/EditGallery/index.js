import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams, NavLink } from 'react-router-dom'
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
            <div className='create-gallery-form-header'>
                <NavLink to={`/galleries/${galleryEdit.id}`}>
                    <i className="fa-solid fa-arrow-left-long"></i>
                </NavLink>
                <h2 className='create-gallery-form-title'>Edit {galleryEdit.title}</h2>
            </div>
            <div className='create-gallery-form-container'>

                <form className='gallery-form' onSubmit={handleSubmit}>
                    {errors.length > 0 && (
                        <ul className="validation-errors">
                            {errors.map((error, idx) => (
                                <li key={idx}>{error}</li>
                            ))}
                        </ul>
                    )}
                    <label>
                        <p className='gallery-form-label'>
                            Title*
                        </p>
                        <input
                            className='gallery-form-input'
                            id="title"
                            type="text"
                            name="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </label>
                    <div className='form-error'></div>
                    <label>
                        <p className='gallery-form-label'>
                            Description
                        </p>
                        <textarea
                            className='gallery-textarea-input'
                            id="description"
                            type="textarea"
                            name="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </label>
                    <div className='form-error'></div>
                    <label>
                        <p className='gallery-form-label'>
                            Visibility
                        </p>
                        <div className='visible-container'>
                            <input
                                className='gallery-radio-input'
                                id="visible"
                                type="radio"
                                checked={visible === true}
                                name="visible"
                                onChange={(e) => setVisible(true)}
                                value={true}
                            /><p className='button-text'><i className="fa-regular fa-eye"></i> Visible to everyone</p>
                        </div>
                        <div className='visible-container'>
                            <input
                                className='gallery-radio-input'
                                id="notvisible"
                                type="radio"
                                checked={visible === false}
                                name="notvisible"
                                onChange={(e) => setVisible(false)}
                                value={false}
                            /><p className='button-text'><i className="fa-solid fa-lock"></i>  Only visible to me</p>
                        </div>
                    </label>
                    <div className='edit-gallery-bottom-buttons'>
                        <button className='delete-gallery-button' onClick={deleteGallery}>Delete gallery</button>
                        <div className='create-gallery-form-buttons'>
                            <div>
                                <NavLink to={`/profile/${user.id}/galleries`} className='cancel-gallery-button'>Cancel</NavLink>
                            </div>
                            <button className="edit-gallery-submit-button" type="submit">Save changes</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}
export default EditGallery
