import { useEffect, useState } from "react"
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, NavLink } from "react-router-dom"
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

    const user = useSelector(state => state.session.user)

    const handleSubmit = async (e) => {
        e.preventDefault()
        setErrors([])
        const description = '' //empty for modal, can add from form

        const payload = {
            userId: user.id,
            title,
            description,
            visible
        }

        const data = await dispatch(thunkCreateGallery(payload))

        if (Array.isArray(data)) {
            // const formattedData = data.map((data) => data.split(': ')[1])
            setErrors(data)
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
        <>
            <div className='create-gallery-form-header'>
                <NavLink to={`/profile/${user.id}/galleries`}>
                    <i className="fa-solid fa-arrow-left-long"></i>
                </NavLink>
                <h2 className='create-gallery-form-title'>Create gallery</h2>
            </div>
            <div className='create-gallery-form-container'>
                <form className='gallery-form' onSubmit={handleSubmit}>
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
                        <div className='errors-profile-edit'>
                            {errors.filter((error) => error.includes('title')).length > 0 ? errors.filter((error) => error.includes('title'))[0].split(': ')[1] : ''}
                        </div>
                    </label>
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
                        <div className='errors-profile-edit'>
                            {errors.filter((error) => error.includes('description')).length > 0 ? errors.filter((error) => error.includes('description'))[0].split(': ')[1] : ''}
                        </div>
                    </label>
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
                    <div className='create-gallery-form-buttons'>
                        <div>
                            <NavLink to={`/profile/${user.id}/galleries`} className='cancel-gallery-button'>Cancel</NavLink>
                        </div>
                        <button className="create-gallery-submit-button" type="submit">Create</button>
                    </div>
                </form>
            </div>
        </>
    )
}
export default CreateGalleryForm
