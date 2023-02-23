import { useDispatch, useSelector } from "react-redux"
import { useState, useEffect } from "react"
import { thunkDeletePhoto, thunkEditPhoto, thunkLoadSinglePhoto } from "../../store/photo"
import { useHistory, useParams } from "react-router-dom"

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
    //const photoId = useSelector((state) => state.photos.photoId)

    useEffect(() => {
        // const loadData = async () => {
        dispatch(thunkLoadSinglePhoto(photoId))
        // }
        // loadData()
    }, [dispatch, photoId])


    const user = useSelector((state) => state.session.user)
    const photoToEdit = useSelector((state) => state.photos.singlePhoto)
    console.log('PHOTO TO EDIT', photoToEdit)


    const [takenDate, setTakenDate] = useState(photoToEdit.takenDate ? datetimeLocal(photoToEdit.takenDate) : '')
    const [category, setCategory] = useState(photoToEdit.category)
    const [cameraType, setCameraType] = useState(photoToEdit.cameraType ? photoToEdit.cameraType : '')
    const [lenseType, setLenseType] = useState(photoToEdit.lenseType ? photoToEdit.lenseType : '')
    const [privacy, setPrivacy] = useState(photoToEdit.privacy)
    const [title, setTitle] = useState(photoToEdit.title ? photoToEdit.title : '')
    const [description, setDescription] = useState(photoToEdit.description ? photoToEdit.description : '')
    const [location, setLocation] = useState(photoToEdit.location ? photoToEdit.location : '')
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

    return (
        <>
        <div>
            <img className='image-size' src={photoToEdit.photoUrl}></img>
        </div>
        <form className='photo-form' onSubmit={handleSubmit}>
                <ul className="validation-errors">
                    {errors.map((error, idx) => (
					    <li key={idx}>{error}</li>
					))}
                </ul>
                <label>
                    <p>
                    Taken on
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

                <button className="create-photo-submit-button" type="submit">Submit</button>
                <button className="delete-button" onClick={deletePhoto}>Delete photo</button>
            </form>
            </>
    )
}

export default EditPhoto
