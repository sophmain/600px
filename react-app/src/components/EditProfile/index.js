import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory } from "react-router-dom"
import { editUserCover, thunkGetAllUser, thunkEditUser, editProfilePhoto } from "../../store/session";
import './EditProfile.css'

function EditProfile() {
    const dispatch = useDispatch()
    const history = useHistory()

    //variables for aws upload
    const fileRef = useRef()
    const profileRef = useRef()
    const [image, setImage] = useState(null);
    const [profileImage, setProfileImage] = useState(null)
    const [imageLoading, setImageLoading] = useState(false);

    //get logged in user to fill in current form data
    const sessionUser = useSelector((state) => state.session.user)

    //usestate variables for edit form
    const [firstName, setFirstName] = useState(sessionUser.firstName)
    const [lastName, setLastName] = useState(sessionUser.lastName)
    const [city, setCity] = useState(sessionUser.city)
    const [country, setCountry] = useState(sessionUser.country)
    const [about, setAbout] = useState(sessionUser.about)
    const [errors, setErrors] = useState([])

    useEffect(() => {
        dispatch(thunkGetAllUser())
    }, [dispatch])

    //handles cover photo upload
    const handleCoverSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("image", image);

        // loading message for slow displaying aws upload
        setImageLoading(true);

        const res = await fetch(`/api/users/${sessionUser.id}/uploadcover`, {
            method: "PUT",
            body: formData,
        });

        if (res.ok) {
            const data = await res.json(); //response after updating cover photo
            setImageLoading(false);
            dispatch(editUserCover(data.cover_photo_url))

        }
        else {
            setImageLoading(false);
            console.log("error");
        }
    }
    //aws for profile photo
    const handleProfileSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("image", profileImage);

        // loading message for slow displaying aws upload
        setImageLoading(true);

        const res = await fetch(`/api/users/${sessionUser.id}/uploadprofile`, {
            method: "PUT",
            body: formData,
        });

        if (res.ok) {
            const data = await res.json(); //response after updating cover photo
            setImageLoading(false);
            dispatch(editProfilePhoto(data.prof_photo_url))

        }
        else {
            setImageLoading(false);
            console.log("error");
        }
    }
    //update cover photo
    const updateImage = (e) => {
        const file = e.target.files[0];
        setImage(file);
        //handleSubmit(e)
    }
    //update profile photo
    const updateProfileImage = (e) => {
        const file = e.target.files[0];
        setProfileImage(file);
        //handleSubmit(e)
    }
    const refClick = () => {
        fileRef.current.click()
    }
    const proRefClick = () => {
        profileRef.current.click()
    }

    //form buttons
    const cancelSubmit = (e) => {
        e.preventDefault()
        history.push(`/profile/${sessionUser.id}`)
    }

    const submitEditProfile = async (e) => {
        e.preventDefault()
        setErrors([])

        // user payload to send to edit thunk
        const payload = {
            // id: sessionUser.id,
            firstName,
            lastName,
            city,
            country,
            about
        }

        const data = await dispatch(thunkEditUser(payload, sessionUser.id))
        if (Array.isArray(data)){
            const formattedData = data.map((data) => data.split(': ')[1])
            setErrors(formattedData)
        } else {
            history.push(`/profile/${sessionUser.id}`)
        }
    }

    return (
        <div className='edit-profile-page-container'>
            <div className='edit-profile-header'>
                <NavLink to={`/profile/${sessionUser.id}`}>
                    <i className="fa-solid fa-arrow-left-long"></i>
                </NavLink>
                <h1 className='edit-profile-title'>Edit Profile</h1>
            </div>
            <div className='edit-profile-form-container'>
                <div className='edit-profile-images'>
                    <div className='edit-profile-cover-photo'>
                        {sessionUser.cover_photo_url && (
                            <img className='edit-profile-cover-photo' src={sessionUser.cover_photo_url} alt='cover'></img>
                        )}
                        {!sessionUser.cover_photo_url && (
                            <img className='edit-profile-cover-photo' src='https://images.pexels.com/photos/933054/pexels-photo-933054.jpeg' alt='cover'></img>
                        )}
                    </div>
                    <div className='edit-prof-photo-container'>
                        {sessionUser.prof_photo_url && (
                            <img className='edit-prof-photo' src={sessionUser.prof_photo_url} alt='profile'></img>
                        )}
                        {!sessionUser.prof_photo_url && (
                            <i class="fa-solid fa-user-large edit-prof-photo"></i>
                        )}
                    </div>
                    <div className='edit-profile-cover-upload-submit-buttons'>
                        <form onSubmit={handleCoverSubmit} className='upload-form'>
                            <input
                                type="button"
                                value="change cover"
                                onClick={refClick}
                            />
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => updateImage(e)}
                                ref={fileRef}
                                style={{ display: 'none' }}
                            />
                            {image && (
                                <>
                                    <button className='submit-cover-photo' type="submit">Confirm selection</button>
                                    {(imageLoading) && <p>Loading...</p>}
                                </>
                            )}
                        </form>
                    </div>
                    <div className='edit-profile-photo-upload-submit-buttons'>
                        <form onSubmit={handleProfileSubmit} className='upload-form'>
                            <input
                                type="button"
                                value="change profile"
                                onClick={proRefClick}
                            />
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => updateProfileImage(e)}
                                ref={profileRef}
                                style={{ display: 'none' }}
                            />
                            {profileImage && (
                                <>
                                    <button className='submit-profile-photo' type="submit">Confirm selection</button>
                                    {(imageLoading) && <p>Loading...</p>}
                                </>
                            )}
                        </form>
                    </div>

                </div>
                <div className='edit-profile-form-container'>
                    <form className='edit-profile-form'>
                        <ul className="validation-errors">
                            {errors.map((error, idx) => (
                                <li key={idx}>{error}</li>
                            ))}
                        </ul>
                        <label>
                            <p className='profile-form-label'>
                                First Name
                            </p>
                            <input
                                className='profile-form-input'
                                id="firstName"
                                type="text"
                                name="firstName"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                            />
                        </label>
                        <label>
                            <p className='profile-form-label'>
                                Last Name
                            </p>
                            <input
                                className='profile-form-input'
                                id="lastName"
                                type="text"
                                name="lastName"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                            />
                        </label>
                        <label>
                            <p className='profile-form-label'>
                                City
                            </p>
                            <input
                                className='profile-form-input'
                                id="city"
                                type="text"
                                name="city"
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                            />
                        </label>
                        <label>
                            <p className='profile-form-label'>
                                Country
                            </p>
                            <input
                                className='profile-form-input'
                                id="country"
                                type="text"
                                name="country"
                                value={country}
                                onChange={(e) => setCountry(e.target.value)}
                            />
                        </label>
                        <label>
                            <p className='profile-form-label'>
                                About
                            </p>
                            <textarea
                                className='profile-form-input'
                                id="about"
                                type="textarea"
                                name="about"
                                value={about}
                                onChange={(e) => setAbout(e.target.value)}
                            />
                        </label>
                    </form>
                    <button className='cancel-edit-profile' onClick={(e)=> cancelSubmit(e)}>Cancel</button>
                    <button className='submit-edit-profile' onClick={(e)=> submitEditProfile(e)}>Submit</button>
                </div>
            </div>


        </div>
    )
}
export default EditProfile
