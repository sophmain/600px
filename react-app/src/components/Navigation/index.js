import React, { useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import OpenModalButton from '../OpenModalButton';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import { useModal } from "../../context/Modal";
import { login } from "../../store/session";
import './Navigation.css';

function Navigation({ isLoaded }) {
	const sessionUser = useSelector(state => state.session.user);
	const history = useHistory()
	const { closeModal } = useModal();
	const dispatch = useDispatch()
	const [errors, setErrors] = useState([]);

	const email = 'demo@aa.io'
	const password = 'password'

	const uploadPhoto = (e) => {
		e.preventDefault()
		history.push(`/upload`)
	}


	const handleSubmit = async (e) => {
		e.preventDefault();
		const data = await dispatch(login(email, password));
		if (data) {
			setErrors(data);
		} else {
			closeModal()
		}
	};

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
				<button className='demo-login' onClick={handleSubmit}>
					Demo-Sign In
				</button>
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
