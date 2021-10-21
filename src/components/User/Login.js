import React, { useState, useContext, useEffect } from 'react';
import { useResource } from 'react-request-hook';
import '../../style.css';
import StateContext from '../../store/Contexts';

/**
 * This Component implements the login functionality
 * @param dispatch is a reducer function of type LOGIN used to set the state of user
 */

function Login() {
  const { dispatch } = useContext(StateContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginFailed, setLoginFailed] = useState(false);

  const handleUsername = (evt) => {
    setUsername(evt.target.value);
  };

  const handlePassword = (evt) => {
    setPassword(evt.target.value);
  };

  const [user, login] = useResource(() => ({
    url: `/login/${encodeURI(username)}/${encodeURI(password)}`,
    method: 'get',
  }));

  useEffect(() => {
    if (user && user.data) {
      if (user.data.length > 0) {
        setLoginFailed(false);
        dispatch({ type: 'LOGIN', username: user.data[0].username });
      } else {
        setLoginFailed(true);
      }
    }
  }, [user]);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        login();
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
      {loginFailed && <span style={{ color: 'red' }}>Invalid username or password</span>}
    </form>
  );
}

export default Login;
