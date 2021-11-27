import React, { useContext } from 'react';
import User from './User';
import StateContext from '../../store/Contexts';

function UserList() {
  const { state } = useContext(StateContext);
  const { users } = state;

  return (
    <div>
      {users.length > 0 && <h5>Users List</h5>}
      {users.map((user) => (
        <User key={user.id} {...user} />
      ))}
    </div>
  );
}

export default UserList;
