import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/session";
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import { useHistory } from "react-router-dom";

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const history = useHistory()
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();


  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

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

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
    history.push('/')
  };

  const userProfile = (e) => {
    e.preventDefault()
    closeMenu()
    history.push(`/profile/${user.id}`)
  }

  //takes to user likes page
  const userLikes = (e) => {
    e.preventDefault()
    closeMenu()
    history.push(`/profile/${user.id}/likes`)
  }
  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");
  const closeMenu = () => setShowMenu(false);

  return (
    <>
      <button onClick={openMenu} className='profile-button'>
        {user && user.prof_photo_url && (
          <img src={user.prof_photo_url} alt='profile dropdown' className='profile-button-nav'></img>
        )}
        {user && !user.prof_photo_url && (
          <i className="fa-regular fa-user profile-button"></i>
        )}
      </button>
      <ul className={ulClassName} ref={ulRef}>
        {user ? (
          <>
            <li className='dropdown-profile-item'>
              <button className='dropdown-button' onClick={userProfile}>Profile</button>
            </li>
            {/* {/* <li className='dropdown-profile-item'>{user.username}</li> */}
            <li className='dropdown-profile-item'>
              <button className='dropdown-button' onClick={userLikes}>Liked photos</button>
              </li>
            <li className='dropdown-profile-item'>
              <button className='dropdown-button' onClick={handleLogout}>Log Out</button>
            </li>

          </>
        ) : (
          <>
            <OpenModalButton
              buttonText="Log In"
              onItemClick={closeMenu}
              modalComponent={<LoginFormModal />}
            />

            <OpenModalButton
              buttonText="Sign Up"
              onItemClick={closeMenu}
              modalComponent={<SignupFormModal />}
            />
          </>
        )}
      </ul>
    </>
  );
}

export default ProfileButton;
