import { useDispatch, useSelector } from "react-redux"
import { useState, useEffect } from "react"
import { thunkDeletePhoto, thunkEditPhoto, thunkLoadSinglePhoto } from "../../store/photo"
import { useHistory, useParams } from "react-router-dom"
import './EditPhoto.css'

const EditPhoto = () => {

    const categories = ['Abstract', 'Aerial', 'Animals', 'Black and White', 'Celebrities', 'City & Architecture', 'Commercial', 'Concert', 'Family', 'Fashion', 'Film', 'Fine Art', 'Food', 'Journalism', 'Landscapes', 'Macro', 'Nature', 'Night', 'People', 'Performing Arts', 'Sport', 'Still Life', 'Street', 'Transportation', 'Travel', 'Underwater', 'Urban Exploration', 'Wedding', 'Other']
    const privacyTypes = ['Public', 'Unlisted', 'Limited Access']


    function datetimeLocal(datetime) {
        const dt = new Date(datetime);
        const newDate = dt.toISOString().split('T')[0]
        return newDate
    }

    const dispatch = useDispatch()
    const history = useHistory()
    const { photoId } = useParams()


    const user = useSelector((state) => state.session.user)
    const photoToEdit = useSelector((state) => state.photos.singlePhoto)



    useEffect(() => {

        dispatch(thunkLoadSinglePhoto(photoId))
    }, [dispatch, photoId])


    const [takenDate, setTakenDate] = useState(photoToEdit?.takenDate ? datetimeLocal(photoToEdit.takenDate) : '')
    const [category, setCategory] = useState(photoToEdit?.category)
    const [cameraType, setCameraType] = useState(photoToEdit?.cameraType ? photoToEdit.cameraType : '')
    const [lenseType, setLenseType] = useState(photoToEdit?.lenseType ? photoToEdit.lenseType : '')
    const [privacy, setPrivacy] = useState(photoToEdit?.privacy)
    const [title, setTitle] = useState(photoToEdit?.title ? photoToEdit.title : '')
    const [description, setDescription] = useState(photoToEdit?.description ? photoToEdit.description : '')
    const [location, setLocation] = useState(photoToEdit?.location ? photoToEdit.location : '')
    const [errors, setErrors] = useState([])
    const [confirmDelete, setConfirmDelete] = useState(false)

    // const [createdPhoto, setCreatedPhoto] = useState('')

    // if (!photoToEdit) return null

    const handleSubmit = async (e) => {
        e.preventDefault()
        setErrors([])

        const payload = {
            ...photoToEdit,
            takenDate,
            category,
            cameraType,
            lenseType,
            privacy,
            title,
            description,
            location
        }

        if (!user) return null

        const data = await dispatch(thunkEditPhoto(payload))

        if (Array.isArray(data)) {
            // const formattedData = data.map((data) => data.split(': ')[1])
            setErrors(data)
        } else {
            history.push(`/photos/${payload.id}`)
        }
    }
    const deletePhoto = (e) => {
        e.preventDefault()
        dispatch(thunkDeletePhoto(photoToEdit))
        history.push('/')
    }
    if (!photoToEdit) return null
    return (
        <>
            <div className="upload-banner">
                <h2>Photo manager</h2>
            </div>
            <div className='post-whole-page-container'>

                <div className="post-container">
                    <div className='post-photo-container'>
                        <img className='post-photo' src={photoToEdit.photoUrl} alt='posted'></img>
                    </div>
                    <div className='post-form-box'>

                        <h3 className='edit-form-title'>Edit photo</h3>
                        <p className='form-is-required'>* is required</p>
                        <form className='photo-form' onSubmit={handleSubmit}>
                            <label>
                                <p className="edit-input">
                                    Photo privacy
                                </p>
                                <select
                                    className='select-field'
                                    id="privacy"
                                    value={privacy}
                                    onChange={(e) => setPrivacy(e.target.value)}
                                >
                                    {privacyTypes.map(privacy => (
                                        <option
                                            key={privacy}
                                            value={privacy}
                                        >
                                            {privacy}
                                        </option>
                                    ))}
                                </select>
                                <div className='errors-profile-edit'>
                                    {errors.filter((error) => error.includes('privacy')).length > 0 ? errors.filter((error) => error.includes('privacy'))[0].split(': ')[1] : ''}
                                </div>
                            </label>
                            <label>
                                <p className="edit-input">
                                    Title*
                                </p>
                                <input
                                    id="title"
                                    className='input-box'
                                    placeholder="e.g. Green Icelandic Canyon"
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
                                <p className="edit-input">
                                    Description
                                </p>
                                <textarea
                                    id="description"
                                    className='textarea-box'
                                    placeholder="e.g. Low angle of a waterfall in a lush green canyon."
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
                                <p className="edit-input">
                                    Location
                                </p>
                                <input
                                    id="location"
                                    className='input-box'
                                    placeholder="Enter Location"
                                    type="text"
                                    name="location"
                                    value={location}
                                    onChange={(e) => setLocation(e.target.value)}
                                />
                                <div className='errors-profile-edit'>
                                    {errors.filter((error) => error.includes('location')).length > 0 ? errors.filter((error) => error.includes('location'))[0].split(': ')[1] : ''}
                                </div>
                            </label>
                            <label>
                                <p className="edit-input">
                                    Category*
                                </p>
                                <select
                                    id="category"
                                    className='select-field'
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                >
                                    {categories.map(category => (
                                        <option
                                            key={category}
                                            value={category}
                                        >
                                            {category}
                                        </option>
                                    ))}
                                </select>
                                <div className='errors-profile-edit'>
                                    {errors.filter((error) => error.includes('category')).length > 0 ? errors.filter((error) => error.includes('category'))[0].split(': ')[1] : ''}
                                </div>
                            </label>
                            <label>
                                <p className="edit-input">
                                    Camera
                                </p>
                                <input
                                    id="cameraType"
                                    className='input-box'
                                    placeholder="e.g. Sony Alpha a7R IV"
                                    type="text"
                                    name="cameraType"
                                    value={cameraType}
                                    onChange={(e) => setCameraType(e.target.value)}
                                />
                                <div className='errors-profile-edit'>
                                    {errors.filter((error) => error.includes('cameraType')).length > 0 ? errors.filter((error) => error.includes('cameraType'))[0].split(': ')[1] : ''}
                                </div>
                            </label>
                            <label>
                                <p className="edit-input">
                                    Lense
                                </p>
                                <input
                                    id="lenseType"
                                    className='input-box'
                                    placeholder="e.g. Sony FE 24-70mm f/2.8 GM"
                                    type="text"
                                    name="lenseType"
                                    value={lenseType}
                                    onChange={(e) => setLenseType(e.target.value)}
                                />
                                <div className='errors-profile-edit'>
                                    {errors.filter((error) => error.includes('lenseType')).length > 0 ? errors.filter((error) => error.includes('lenseType'))[0].split(': ')[1] : ''}
                                </div>
                            </label>
                            <label>
                                <p className="edit-input">
                                    Date taken
                                </p>
                                <input
                                    id="takenDate"
                                    className='input-box'
                                    type="date"
                                    name="takenDate"
                                    value={takenDate}
                                    onChange={(e) => setTakenDate(e.target.value)}
                                />
                                <div className='errors-profile-edit'>
                                    {errors.filter((error) => error.includes('takenDate')).length > 0 ? errors.filter((error) => error.includes('takenDate'))[0].split(': ')[1] : ''}
                                </div>
                            </label>
                            <div className='photo-delete-buttons-edit-page'>
                                {!confirmDelete && (
                                    <button className='delete-photo-button' onClick={() => setConfirmDelete(true)} style={{ marginRight: '5px' }}>Delete photo</button>
                                )}
                                {confirmDelete && (
                                    <button className='delete-photo-button' onClick={deletePhoto} >Confirm delete</button>
                                )}
                            </div>
                            <button className="create-product-submit-button" type="submit">Save changes</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default EditPhoto
