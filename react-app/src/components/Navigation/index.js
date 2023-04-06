import React, { useState, useRef, useEffect } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import ProfileButton from './ProfileButton';
import OpenModalButton from '../OpenModalButton';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import { cleanUpSearchAction, thunkCreateSearch } from '../../store/search';
import { thunkLoadPhotos } from '../../store/photo';
import './Navigation.css';

function Navigation({ isLoaded }) {
	const sessionUser = useSelector(state => state.session.user);
	const history = useHistory()
	const dispatch = useDispatch()
	const [showMenu, setShowMenu] = useState(false);
	const [autocompleteResults, setAutocompleteResults] = useState([]);
	const [query, setQuery] = useState('');
	const [hovered, setHovered] = useState(false);
	const ulRef = useRef();

	const uploadPhoto = (e) => {
		e.preventDefault()
		history.push(`/upload`)
	}

	// load photos once for search component
	useEffect(()=> {
		dispatch(thunkLoadPhotos())
	},[])

	useEffect(() => {
		if (!showMenu) return;

		const closeMenu = (e) => {
			if (!ulRef.current.contains(e.target)) {
				setShowMenu(false);
			}
		};

		document.addEventListener("click", closeMenu);

		return () => document.removeEventListener("click", closeMenu);
	}, [showMenu]);

	const photosObj = useSelector((state) => state.photos.allPhotos)
	if (!photosObj) return null

	const handleMouseEnter = () => {
		setHovered(true);
	};

	const handleMouseLeave = () => {
		setHovered(false);
	};

	// const ulClassName = "discover-dropdown" + (showMenu ? "" : " hidden");
	// const closeMenu = () => setShowMenu(false);

	const handleSearch = async (e) => {
		e.preventDefault();

		dispatch(cleanUpSearchAction())
		dispatch(thunkCreateSearch(query))
		history.push('/search')
		setQuery('')
	};

	const handleAutocomplete = (e) => {
		const searchQuery = e.target.value;
		setQuery(searchQuery);
		const photosArr = Object.values(photosObj);

		//not all photos have descriptions

		const results = photosArr.filter((photo) => {
			const description = photo.description ? photo.description.toLowerCase() : ''
			return photo.title.toLowerCase().includes(searchQuery.toLowerCase()) || description.includes(searchQuery.toLowerCase());
		})
		setAutocompleteResults(results);
	};
	const handleBlur = () => {
		if (!hovered) {
		  setAutocompleteResults([]);
		}
	  };

	let sessionLinks;
	if (sessionUser) {
		sessionLinks = (
			<div className='nav-bar-right'>
				<div className='nav-bar-search-container'>
					<form onSubmit={handleSearch} className='nav-bar-search-form'>
						<div className="nav-bar-search-wrapper">
							<button type="submit" className="nav-bar-search-button">
								<i className="fa fa-search"></i>
							</button>
							<input
								placeholder="Search 600px"
								className="nav-bar-search-text-field"
								type="text" value={query}
								onChange={handleAutocomplete}
								onBlur={handleBlur}

							/>


						</div>
						{autocompleteResults.length > 0 && (
							<ul className="nav-bar-search-autocomplete" onMouseLeave={handleMouseLeave}>
								{autocompleteResults.map((result) => (
									<NavLink
										key={result.id}
										className='auto-search-link-item'
										to={`/photos/${result.id}`}
										onClick={() => { setQuery(''); setAutocompleteResults([]) }}
										onMouseEnter={handleMouseEnter}
									>
										<li className='auto-search-item' key={result.id}>{result.title}</li>
									</NavLink>
								))}
							</ul>
						)}
					</form>
				</div>
				<NavLink className='nav-direct-messaging' to={'/messages'}>
					<i className="fa-regular fa-paper-plane"></i>
				</NavLink>
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
						className='log-in-modal'
						buttonText="Log In"
						modalComponent={<LoginFormModal />}
					/>
					<OpenModalButton
						className='sign-up-modal'
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
			{/* <div className='discover-dropdown'>
				<button onClick={openMenu} className='discover-button'>
					Discover
				</button>
				<ul className={ulClassName} ref={ulRef}>
					<>
						<li>
							<button className='nav-all-photos-page-button' onClick={allPhotos}>Photos</button>
						</li>
					</>
				</ul>
			</div> */}

			<div className='nav-bar-login-signup'>
				{isLoaded && sessionLinks}
			</div>


		</div>
	);
}

export default Navigation;
