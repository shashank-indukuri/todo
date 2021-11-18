import React, { useState, useContext, useEffect } from 'react';
import { useResource } from 'react-request-hook';
import '../../style.css';
import StateContext from '../../store/Contexts';

/**
 * This Component implements the new account creation funcitonality
 */

function Register() {
  const { dispatch } = useContext(StateContext);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: '',
  });

  const [status, setStatus] = useState('');

  const handleUsername = (evt) => {
    setFormData({ ...formData, username: evt.target.value });
  };

  const handlePassword = (evt) => {
    setFormData({ ...formData, password: evt.target.value });
  };

  const handleConfirmPassword = (evt) => {
    setFormData({ ...formData, confirmPassword: evt.target.value });
  };

  const [user, register] = useResource((username, password, confirmPassword) => ({
    url: '/auth/register',
    method: 'post',
    data: { username, password, passwordConfirmation: confirmPassword },
  }));

  useEffect(() => {
    if (user && user.data) {
      dispatch({ type: 'REGISTER', id: user.data.id, username: user.data.username });
    }
  }, [user]);

  useEffect(() => {
    if (user && user.isLoading === false && (user.data || user.error)) {
      if (user.error) {
        setStatus('Registration failed, please try again later.');
        alert('Registration failed, please try again later.');
      } else {
        setStatus('Registration successful. You may now login.');
        alert('Registration successful. You may now login.');
      }
      console.log(status);
    }
  }, [user]);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        register(formData.username, formData.password, formData.confirmPassword);
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
        disabled={formData.username.length === 0 || formData.password !== formData.confirmPassword}
      />
    </form>
  );
}

export default Register;
