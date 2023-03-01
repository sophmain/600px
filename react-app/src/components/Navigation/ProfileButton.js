import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
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
  };

  const userProfile = (e) => {
    e.preventDefault()
    history.push(`/profile/${user.id}`)
  }
  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");
  const closeMenu = () => setShowMenu(false);

  return (
    <>
      <button onClick={openMenu} className='profile-button'>
        <img src={user.prof_photo_url} alt='profile dropdown' className='profile-button'></img>
      </button>
      <ul className={ulClassName} ref={ulRef}>
        {user ? (
          <>
            <li className='dropdown-profile-item'>
              <button className='dropdown-button' onClick={userProfile}>Profile</button>
            </li>
            {/* <li className='dropdown-profile-item'>{user.username}</li>
            <li className='dropdown-profile-item'>{user.email}</li> */}
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
