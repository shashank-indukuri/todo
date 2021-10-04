import React from 'react';
import Login from './Login';
import Logout from './Logout';
import Register from './Register';

/**
 * This Component is the container for the user authentication functionality
 */

function UserCard({ user, dispatch }) {
  if (user) {
    return <Logout user={user} dispatch={dispatch} />;
  }
  return (
    <div>
      <Login dispatch={dispatch} />
      <br />
      <Register dispatch={dispatch} />
    </div>
  );
}

export default UserCard;
