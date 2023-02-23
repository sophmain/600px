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
                        <img className='post-photo' src={latestUpload.uploadUrl}></img>
                    </div>
                    <div className='post-form-box'>


                        <form className='photo-form' onSubmit={handleSubmit}>
                            <ul className="validation-errors">
                                {errors.map((error, idx) => (
                                    <li key={idx}>{error}</li>
                                ))}
                            </ul>
                            <label>
                                <p className="input-privacy">
                                    Privacy
                                </p>
                                <select
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
                            <label>
                                <p>
                                    Title
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
                                <p>
                                    Location
                                </p>
                                <input
                                    id="location"
                                    type="text"
                                    name="location"
                                    value={location}
                                    onChange={(e) => setLocation(e.target.value)}
                                />
                            </label>
                            <label>
                                <p className="input-category">
                                    Category
                                </p>
                                <select
                                    id="category"
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
                            <label>
                                <p>
                                    Taken date
                                </p>
                                <input
                                    id="takenDate"
                                    type="date"
                                    name="takenDate"
                                    value={takenDate}
                                    onChange={(e) => setTakenDate(e.target.value)}
                                />
                            </label>

                            <label>
                                <p>
                                    Camera Type
                                </p>
                                <input
                                    id="cameraType"
                                    type="text"
                                    name="cameraType"
                                    value={cameraType}
                                    onChange={(e) => setCameraType(e.target.value)}
                                />
                            </label>
                            <label>
                                <p>
                                    Lense Type
                                </p>
                                <input
                                    id="lenseType"
                                    type="text"
                                    name="lenseType"
                                    value={lenseType}
                                    onChange={(e) => setLenseType(e.target.value)}
                                />
                            </label>

                            <button className="create-product-submit-button" type="submit">Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}
export default PostPhoto
