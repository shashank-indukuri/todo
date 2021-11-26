import React, { useEffect, useContext } from 'react';
import { useResource } from 'react-request-hook';
import { Spinner } from 'react-bootstrap';
import StateContext from '../store/Contexts';
import TodoList from '../components/Todo/TodoList';

export default function HomePage() {
  const { state, dispatch } = useContext(StateContext);
  const { user } = state;

  const [todos, getTodos] = useResource(() => ({
    url: `/users/${user.id}`,
    method: 'get',
    headers: { Authorization: `${user.access_token}` },
  }));

  useEffect(() => {
    if (user.id) {
      getTodos();
    }
  }, [user.access_token]);

  useEffect(() => {
    if (todos && todos.data) {
      dispatch({ type: 'FETCH_TODOS', todos: todos.data.todos });
    }
  }, [todos]);
  const { isLoading } = todos;

  return (
    <>
      {isLoading && (
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Todos Loading...</span>
        </Spinner>
      )}
      <TodoList />
    </>
  );
}
