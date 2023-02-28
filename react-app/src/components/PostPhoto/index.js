import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom"
import { useState, useEffect } from "react"
import { thunkPostPhoto } from "../../store/photo"
import { thunkLoadAllUploads } from "../../store/upload"
import './PostPhoto.css'

const PostPhoto = () => {

    const categories = ['Abstract', 'Aerial', 'Animals', 'Black and White', 'Celebrities', 'City & Architecture', 'Commercial', 'Concert', 'Family', 'Fashion', 'Film', 'Fine Art', 'Food', 'Journalism', 'Landscapes', 'Macro', 'Nature', 'Night', 'People', 'Performing Arts', 'Sport', 'Still Life', 'Street', 'Transportation', 'Travel', 'Underwater', 'Urban Exploration', 'Wedding', 'Other']
    const privacyTypes = ['Public', 'Unlisted', 'Limited Access']

    const dispatch = useDispatch()
    const history = useHistory()

    const [takenDate, setTakenDate] = useState('')
    const [category, setCategory] = useState(categories[0])
    const [cameraType, setCameraType] = useState('')
    const [lenseType, setLenseType] = useState('')
    const [privacy, setPrivacy] = useState(privacyTypes[0])
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [location, setLocation] = useState('')
    const [errors, setErrors] = useState([])
    const [createdPhoto, setCreatedPhoto] = useState('')


    useEffect(() => {
        dispatch(thunkLoadAllUploads())
        if (createdPhoto) {
            history.push(`/photos/${createdPhoto.id}`)
        }
    }, [dispatch, createdPhoto])

    const uploadsObj = useSelector((state) => state.uploads.allUploads)
    const user = useSelector(state => state.session.user)
    if (!uploadsObj) return null
    const uploads = Object.values(uploadsObj)
    const latestUpload = uploads[uploads.length - 1]


    const handleSubmit = async (e) => {
        e.preventDefault()
        setErrors([])

        const payload = {
            userId: user.id,
            uploadId: latestUpload.id,
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

        const data = await dispatch(thunkPostPhoto(payload))

        if (Array.isArray(data)) {
            setErrors(data);
        } else {
            setCreatedPhoto(data)
        }
    }


    return (
        <>
            <div className="upload-banner">
                <h2>Upload</h2>
            </div>
            <div className='post-whole-page-container'>

                <div className="post-container">
                    <div className='post-photo-container'>
                        <img className='post-photo' src={latestUpload.uploadUrl} alt='latest upload'></img>
                    </div>
                    <div className='post-form-box'>
                        <h3 className='edit-form-title'>1 photo selected</h3>
                        <p className='form-is-required'>* is required</p>
                        <form className='photo-form' onSubmit={handleSubmit}>
                            {errors.length > 0 && (
                                <ul className="validation-errors">
                                    {errors.map((error, idx) => (
                                        <li key={idx}>{error}</li>
                                    ))}
                                </ul>
                            )}
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
                            </label>
                            <div className='form-error'></div>
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
                            </label>
                            <div className='form-error'></div>
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
                            </label>
                            <div className='form-error'></div>
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
                            </label>
                            <div className='form-error'></div>
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
                            </label>
                            <div className='form-error'></div>
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
                            </label>
                            <div className='form-error'></div>
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
                            </label>
                            <div className='form-error'></div>
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
                            </label>
                            <button className="create-product-submit-button" type="submit">Upload</button>
                        </form>

                    </div>
                </div>
            </div>
        </>
    )
}
export default PostPhoto
