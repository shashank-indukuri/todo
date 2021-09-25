import React, { useState } from 'react';
import '../../style.css';

/**
 * This Component implements the new account creation funcitonality
 * @param setUser Used to set the state of the user
 */

function Register({ setUser }) {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: '',
  });

  const handleUsername = (evt) => {
    setFormData({ ...formData, username: evt.target.value });
  };

  const handlePassword = (evt) => {
    setFormData({ ...formData, password: evt.target.value });
  };

  const handleConfirmPassword = (evt) => {
    setFormData({ ...formData, confirmPassword: evt.target.value });
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setUser(formData.username);
      }}
    >
      <label htmlFor="register-username">Username:</label>
      <input
        type="text"
        value={formData.username}
        onChange={handleUsername}
        name="register-username"
        id="register-username"
      />
      <label className="tab" htmlFor="register-password">
        Password:
      </label>
      <input
        type="password"
        value={formData.password}
        onChange={handlePassword}
        name="register-password"
        id="register-password"
      />
      <label className="tab" htmlFor="register-password-confirm">
        Confirm password:
      </label>
      <input
        type="password"
        value={formData.confirmPassword}
        onChange={handleConfirmPassword}
        name="register-password-confirm"
        id="register-password-confirm"
      />
      <input
        className="tab"
        type="submit"
        value="Register"
        disabled={
          formData.username.length === 0 ||
          formData.password.length < 8 ||
          formData.password !== formData.confirmPassword
        }
      />
    </form>
  );
}

export default Register;
