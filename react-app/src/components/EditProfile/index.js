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
    const [imageLoading, setImageLoading] = useState(false)
    const [coverSubmited, setCoverSubmited] = useState(true) //hide confirm button after submit
    const [profileSubmitted, setProfileSubmitted] = useState(true)

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
            setCoverSubmited(false)
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
            setProfileSubmitted(false)
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
        if (Array.isArray(data)) {
            // const formattedData = data.map((data) => data.split(': ')[1])
            setErrors(data)
        } else {
            history.push(`/profile/${sessionUser.id}`)
        }
    }
    console.log('errors', errors)

    return (
        <div className='edit-profile-page-container'>
            <NavLink to={`/profile/${sessionUser.id}`} className='edit-profile-back'>
                <i className="fa-solid fa-arrow-left-long"></i>
            </NavLink>
            <div className='edit-profile-header'>
                <h1 className='edit-profile-title'>Edit Profile</h1>
            </div>
            <div className='edit-profile-images-container'>
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
                            <i className="fa-solid fa-user-large edit-prof-photo"></i>
                        )}
                    </div>
                    <div className='edit-profile-cover-upload-submit-buttons'>
                        <form onSubmit={handleCoverSubmit} className='upload-cover-form'>
                            <button
                                className='change-cover-button'
                                type="button"
                                // value=''
                                onClick={refClick}>
                                <i className="fa-solid fa-camera"></i> Change cover photo
                            </button>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => { updateImage(e); setCoverSubmited(true) }}
                                ref={fileRef}
                                style={{ display: 'none' }}
                            />
                            {image && coverSubmited && (
                                <>
                                    <button className='submit-cover-photo' type="submit">Confirm</button>
                                    {(imageLoading) && <p className='loading-text-profile'>Loading...</p>}
                                </>
                            )}
                        </form>
                    </div>
                    <div className='edit-profile-photo-upload-submit-buttons'>
                        <form onSubmit={handleProfileSubmit} className='upload-profile-form'>
                            <div className='form-icons'>
                                <button
                                    className='change-profile-button'
                                    type="button"
                                    onClick={proRefClick}>
                                    <i className="fa-solid fa-camera"></i>
                                </button>
                            </div>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => { updateProfileImage(e); setProfileSubmitted(true) }}
                                ref={profileRef}
                                style={{ display: 'none' }}
                            />
                            {profileImage && profileSubmitted && (
                                <>
                                    <button className='submit-profile-photo' type="submit">Confirm</button>
                                    {(imageLoading) && <p className='loading-text-profile'>Loading...</p>}
                                </>
                            )}
                        </form>
                    </div>

                </div>
                <div className='edit-profile-form-container'>
                    <form className='edit-profile-form'>
                        <ul className="validation-errors">
                        </ul>
                        <div className='profile-row-edit'>
                            <label className='profile-form-padding'>
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
                                <div className='errors-profile-edit'>
                                    {errors.filter((error) => error.includes('firstName')).length > 0 ? errors.filter((error) => error.includes('firstName'))[0].split(': ')[1] : ''}
                                </div>
                            </label>
                            <label className='profile-form-padding'>
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
                                <div className='errors-profile-edit'>
                                    {errors.filter((error) => error.includes('lastName')).length > 0 ? errors.filter((error) => error.includes('lastName'))[0].split(': ')[1] : ''}
                                </div>
                            </label>
                        </div>
                        <div className='profile-row-edit'>
                            <label className='profile-form-padding'>
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
                                <div className='errors-profile-edit'>
                                    {errors.filter((error) => error.includes('city')).length > 0 ? errors.filter((error) => error.includes('city'))[0].split(': ')[1] : ''}
                                </div>
                            </label>
                            <label className='profile-form-padding'>
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
                                <div className='errors-profile-edit'>
                                    {errors.filter((error) => error.includes('country')).length > 0 ? errors.filter((error) => error.includes('country'))[0].split(': ')[1] : ''}
                                </div>
                            </label>
                        </div>
                        <label className='profile-form-padding'>
                            <p className='profile-form-label'>
                                About
                            </p>
                            <textarea
                                className='profile-textarea-input'
                                id="about"
                                type="textarea"
                                name="about"
                                value={about}
                                onChange={(e) => setAbout(e.target.value)}
                            />
                            <div className='errors-profile-edit'>
                                {errors.filter((error) => error.includes('about')).length > 0 ? errors.filter((error) => error.includes('about'))[0].split(': ')[1] : ''}
                            </div>
                        </label>
                    </form>
                    <div className='edit-profile-cancel-submit'>
                        <button className='cancel-edit-profile' onClick={(e) => cancelSubmit(e)}>Cancel</button>
                        <button className='submit-edit-profile' onClick={(e) => submitEditProfile(e)}>Save changes</button>
                    </div>
                </div>
            </div>


        </div>
    )
}
export default EditProfile
