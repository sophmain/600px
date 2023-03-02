import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom"
import { editUser, thunkGetAllUser } from "../../store/session";
import './EditProfile.css'

function EditProfile() {
    const dispatch = useDispatch()
    const fileRef = useRef()
    const [image, setImage] = useState(null);
    const [imageLoading, setImageLoading] = useState(false);
    const sessionUser = useSelector((state) => state.session.user)

    useEffect(() => {
        dispatch(thunkGetAllUser())
    }, [dispatch])

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("image", image);

        // loading message for slow displaying aws upload
        setImageLoading(true);
        console.log('FORM DATA IN COMPONENT', formData)

        const res = await fetch(`/api/users/${sessionUser.id}/upload`, {
            method: "PUT",
            body: formData,
        });
        console.log('res in component', res)
        if (res.ok) {
            const data = await res.json();
            setImageLoading(false);
            dispatch(editUser(data.cover_photo_url))
            //history.push("/post");
        }
        else {
            setImageLoading(false);
            console.log("error");
        }
    }

    const updateImage = (e) => {
        const file = e.target.files[0];
        setImage(file);
        //handleSubmit(e)
        console.log('in update image function')
    }
    const refClick = () => {
        fileRef.current.click()
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
                        <form onSubmit={handleSubmit} className='upload-form'>
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

                </div>
                <div className='edit-profile-form'>

                </div>
            </div>


        </div>
    )
}
export default EditProfile
