import React from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import OpenModalButton from '../OpenModalButton';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import './Navigation.css';

function Navigation({ isLoaded }) {
	const sessionUser = useSelector(state => state.session.user);
	const history = useHistory()

	const uploadPhoto = (e) => {
		e.preventDefault()
		history.push(`/upload`)
	}

	let sessionLinks;
	if (sessionUser) {
		sessionLinks = (
			<div className='nav-bar-right'>

				<div style={{ marginRight: '15px' }}>
					<ProfileButton user={sessionUser} />
				</div>
				<button className='upload-photo-button' onClick={(e) => uploadPhoto(e)}><i className="fa-solid fa-arrow-up"></i>Upload</button>
			</div>
		);

	} else {
		sessionLinks = (
			<div className='button-container'>
				<div className='nav-bar-login-modal-button'>
					<OpenModalButton
						className = 'log-in-modal'
						buttonText="Log In"
						modalComponent={<LoginFormModal />}
					/>
					<OpenModalButton
					className= 'sign-up-modal'
                    buttonText="Sign Up"
                    modalComponent={<SignupFormModal />}
                />
				</div>
			</div >
		);
	}

	return (
		<div className='nav-header-container'>
			<NavLink exact to="/" className='home-logo'>6OO<sup>px</sup></NavLink>
			<div className = 'discover-dropdown'>

			</div>
			<div className='nav-bar-login-signup'>
				{isLoaded && sessionLinks}
			</div>


		</div>
	);
}

export default Navigation;
