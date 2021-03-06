import React, { useEffect, useContext } from 'react';
import { useResource } from 'react-request-hook';
import { Spinner } from 'react-bootstrap';
import StateContext from '../store/Contexts';
import TodoLists from '../components/TodoList/TodoLists';

export default function HomePage() {
  const { state, dispatch } = useContext(StateContext);
  const { user } = state;

  const [todoLists, getTodoLists] = useResource(() => ({
    url: 'todoLists',
    method: 'get',
    headers: { Authorization: `${user.access_token}` },
  }));

  useEffect(() => {
    if (user.id) {
      getTodoLists();
    }
  }, [user.access_token]);

  useEffect(() => {
    if (todoLists && todoLists.data) {
      dispatch({ type: 'FETCH_TODOLISTS', todoLists: todoLists.data.todoLists });
    }
  }, [todoLists]);
  const { isLoading } = todoLists;

  return (
    <>
      {isLoading && (
        <Spinner animation="border" role="status">
          <span className="todoListsvisually-hidden">TodoLists Loading...</span>
        </Spinner>
      )}
      <TodoLists />
    </>
  );
}
