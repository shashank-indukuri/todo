import React, { useEffect, useContext } from 'react';
import { useResource } from 'react-request-hook';
import { Spinner } from 'react-bootstrap';
import StateContext from '../store/Contexts';
import UserList from '../components/Users/UserList';

export default function UserPage() {
  const { dispatch } = useContext(StateContext);

  const [users, getUsers] = useResource(() => ({
    url: '/users',
    method: 'get',
  }));

  useEffect(getUsers, []);

  useEffect(() => {
    if (users && users.data) {
      dispatch({ type: 'FETCH_USERS', users: users.data.users });
    }
  }, [users]);
  const { isLoading } = users;

  return (
    <>
      {isLoading && (
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Users Loading...</span>
        </Spinner>
      )}
      <UserList />
    </>
  );
}
