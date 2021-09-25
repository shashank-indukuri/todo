import React from 'react';
import Login from './Login';
import Logout from './Logout';
import Register from './Register';

/**
 * This Component is the container for the user authentication functionality
 */

function UserCard({ user, setUser, setTodos }) {
  if (user) {
    return <Logout user={user} setUser={setUser} setTodos={setTodos} />;
  }
  return (
    <div>
      <Login setUser={setUser} />
      <br />
      <Register setUser={setUser} />
    </div>
  );
}

export default UserCard;
