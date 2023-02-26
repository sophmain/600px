import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { signUp } from "../../store/session";
import "./SignupForm.css";

function SignupFormModal() {
	const dispatch = useDispatch();
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [email, setEmail] = useState("");
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [errors, setErrors] = useState([]);
	const { closeModal } = useModal();

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (password === confirmPassword) {
			const data = await dispatch(signUp(firstName, lastName, email, username, password));
			if (data) {
				setErrors(data);
			} else {
				closeModal();
			}
		} else {
			setErrors([
				"Passwords do not match",
			]);
		}
	};

	return (
		<div className='signup-modal-container'>
			<h1 className='sign-up-title'>Join 600px</h1>
			<p classNam='discover-photos-text'>Discover and share incredible photos.</p>
			<form className='signup-form' onSubmit={handleSubmit}>
				{errors.length > 0 && (
					<ul>
						{errors.map((error, idx) => (
							<li key={idx}>{error}</li>
						))}
					</ul>
				)}
				<div className='form-error'></div>
				<label className='login-header'>
					First Name*
					<input
						className='login-form-field'
						type="text"
						value={firstName}
						onChange={(e) => setFirstName(e.target.value)}
						required
					/>
				</label>
				<div className='form-error'></div>
				<label className='login-header'>
					Last Name*
					<input
					    className='login-form-field'
						type="text"
						value={lastName}
						onChange={(e) => setLastName(e.target.value)}
						required
					/>
				</label>
				<div className='form-error'></div>
				<label className='login-header'>
					Email*
					<input
					    className='login-form-field'
						type="text"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						required
					/>
				</label>
				<div className='form-error'></div>
				<label className='login-header'>
					Username*
					<input
						className='login-form-field'
						type="text"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
						required
					/>
				</label>
				<div className='form-error'></div>
				<label className='login-header'>
					Password*
					<input
						className='login-form-field'
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						required
					/>
				</label>
				<div className='form-error'></div>
				<label className='login-header'>
					Confirm Password*
					<input
						className='login-form-field'
						type="password"
						value={confirmPassword}
						onChange={(e) => setConfirmPassword(e.target.value)}
						required
					/>
				</label>
				<div className='form-error'></div>
				<button className='login-button' type="submit">Sign Up</button>
			</form>
		</div>
	);
}

export default SignupFormModal;
