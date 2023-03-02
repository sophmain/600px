import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom"
import './EditProfile.css'

function EditProfile() {

    const sessionUser = useSelector((state) => state.session.user)
    console.log('session user', sessionUser)

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

                </div>
                <div className='edit-profile-form'>

                </div>
            </div>


        </div>
    )
}
export default EditProfile
