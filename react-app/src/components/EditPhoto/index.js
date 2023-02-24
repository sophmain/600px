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

    console.log('PHOTO TO EDIT', photoToEdit)


    useEffect(() => {
        console.log('INSIDE EDIT PAGE USE EFFECT')
        dispatch(thunkLoadSinglePhoto(photoId))
    }, [dispatch])


    const [takenDate, setTakenDate] = useState(photoToEdit?.takenDate ? datetimeLocal(photoToEdit.takenDate) : '')
    const [category, setCategory] = useState(photoToEdit?.category)
    const [cameraType, setCameraType] = useState(photoToEdit?.cameraType ? photoToEdit.cameraType : '')
    const [lenseType, setLenseType] = useState(photoToEdit?.lenseType ? photoToEdit.lenseType : '')
    const [privacy, setPrivacy] = useState(photoToEdit?.privacy)
    const [title, setTitle] = useState(photoToEdit?.title ? photoToEdit.title : '')
    const [description, setDescription] = useState(photoToEdit?.description ? photoToEdit.description : '')
    const [location, setLocation] = useState(photoToEdit?.location ? photoToEdit.location : '')
    const [errors, setErrors] = useState([])

    // const [createdPhoto, setCreatedPhoto] = useState('')

    // if (!photoToEdit) return null

    const handleSubmit = async (e) => {
        e.preventDefault()
        setErrors([])

        const payload = {
            // userId: user.id,
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
            setErrors(data);
        } else {
            history.push(`/photos/${payload.id}`)
            //  setCreatedPhoto(data)
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
                <h2>Upload</h2>
            </div>
            <div className='post-whole-page-container'>

                <div className="post-container">
                    <div className='post-photo-container'>
                        <img className='post-photo' src={photoToEdit.photoUrl}></img>
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
                            <button className='delete-photo-button' onClick={deletePhoto}>Delete photo</button>
                            <button className="create-product-submit-button" type="submit">Save changes</button>


                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default EditPhoto
