import React, { useEffect, useContext } from 'react';
import { useResource } from 'react-request-hook';
import { Spinner } from 'react-bootstrap';
import { Link } from 'react-navi';
import StateContext from '../store/Contexts';
import TodoList from '../components/Todo/TodoList';

export default function TodoListPage({ id }) {
  const { state, dispatch } = useContext(StateContext);
  const { user } = state;
  const navigateTo = `/todoList/${id}/todo/create`;

  const [todos, getTodos] = useResource(() => ({
    url: `/todoLists/${id}`,
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
      {user.username && <Link href={navigateTo}>Create New Todo</Link>}
      <TodoList />
    </>
  );
}
