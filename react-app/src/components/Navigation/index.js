import React from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }){
	const sessionUser = useSelector(state => state.session.user);
	const history = useHistory()

	const uploadPhoto = (e) => {
		e.preventDefault()
		history.push(`/upload`)
	}

	return (
		<ul>
			<li>
				<NavLink exact to="/">Home</NavLink>
			</li>
			{isLoaded && (
				<li>
					<ProfileButton user={sessionUser} />
				</li>
			)}
			<button className = 'upload-photo-button' onClick={(e) => uploadPhoto(e)}>Upload</button>
		</ul>
	);
}

export default Navigation;
