import React, { useContext } from 'react';
import User from './User';
import StateContext from '../../store/Contexts';

/**
 * This Component loops the todo list and return its child component for each Todo
 */

function UserList() {
  const { state } = useContext(StateContext);
  const { users } = state;

  return (
    <div>
      <h3>User List</h3>
      {users.map((user) => (
        <User key={user.id} {...user} />
      ))}
    </div>
  );
}

export default UserList;
