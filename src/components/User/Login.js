import React, { useState } from 'react';
import '../../style.css';

/**
 * This Component implements the login functionality
 * @param dispatch is a reducer function of type LOGIN used to set the state of user
 */

function Login({ dispatch }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleUsername = (evt) => {
    setUsername(evt.target.value);
  };

  const handlePassword = (evt) => {
    setPassword(evt.target.value);
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        dispatch({ type: 'LOGIN', username });
      }}
    >
      <label htmlFor="login">Username:</label>
      <input
        type="text"
        value={username}
        onChange={handleUsername}
        name="login-username"
        id="login-username"
      />
      <label className="tab" htmlFor="login-password">
        Password:
      </label>
      <input
        type="password"
        value={password}
        onChange={handlePassword}
        name="login-password"
        id="login-password"
      />
      <input
        className="tab"
        type="submit"
        value="Login"
        disabled={username.length === 0 || password.length === 0}
      />
    </form>
  );
}

export default Login;
