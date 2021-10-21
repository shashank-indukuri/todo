import React, { useContext } from 'react';
import Login from './Login';
import Logout from './Logout';
import Register from './Register';
import StateContext from '../../store/Contexts';

/**
 * This Component is the container for the user authentication functionality
 */

function UserCard() {
  const { state } = useContext(StateContext);
  if (state.user) {
    return <Logout />;
  }
  return (
    <div>
      <br />
      <Login />
      <br />
      <Register />
    </div>
  );
}

export default UserCard;
