import React, { useState } from "react";
import { login } from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";

function LoginFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();
  const demoEmail = 'demo@aa.io'
  const demoPassword = 'password'

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    } else {
      closeModal()
    }
  };

  const handleDemo = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(demoEmail, demoPassword));
    if (data) {
      setErrors(data);
    } else {
      closeModal()
    }
  };
  console.log('errors', errors)

  return (
    <div className='login-modal-container'>
      <h1 className='login-title' style={{margin: '5px'}}>Log in to 600px</h1>
      <form className='log-in-form' onSubmit={handleSubmit}>
        <div className='errors-profile-edit' style={{height: '35px', width: '65%', marginBottom: '5px'}}>
          <div style={{marginBottom: '5px'}}>{errors.filter((error) => error.includes('valid email')).length > 0 ? errors.filter((error) => error.includes('valid email'))[0].split(': ')[1] : ''}</div>
          <div>{errors.filter((error) => error.includes('Credentials')).length > 0 ? errors.filter((error) => error.includes('Credentials'))[0].split(': ')[1] : ''}</div>
        </div>
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
        <button className='login-button' type="submit">Log In</button>
        <button className='demo-login' onClick={handleDemo}>
          Log in with demo user
        </button>
      </form>
    </div>

  );
}

export default LoginFormModal;
