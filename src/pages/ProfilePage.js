import React, { useContext, useEffect } from 'react';
import { useResource } from 'react-request-hook';
import { Link } from 'react-navi';
import StateContext from '../store/Contexts';
import TodoList from '../components/Todo/TodoList';

export default function ProfilePage({ id }) {
  const { dispatch } = useContext(StateContext);
  const [todos, getTodos] = useResource(() => ({
    url: `/users/${id}`,
    method: 'get',
  }));

  useEffect(getTodos, []);

  useEffect(() => {
    if (todos && todos.isLoading === false && todos.data) {
      dispatch({ type: 'FETCH_TODOS', todos: todos.data.todos }); // Within the tasks reducers I need a new action FETCH_TASK
    }
  }, [todos]);

  const { isLoading } = todos;
  return (
    <div>
      <hr />
      <div>
        <Link href="/users">Go back</Link>
        {isLoading && 'Todos loading...'} <TodoList />
      </div>
    </div>
  );
}
