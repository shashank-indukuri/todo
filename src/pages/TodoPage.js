import React, { useEffect, useContext } from 'react';
import { useResource } from 'react-request-hook';
import { Link } from 'react-navi';
import Todo from '../components/Todo/Todo';
import StateContext from '../store/Contexts';

export default function TodoPage({ id }) {
  const { state } = useContext(StateContext);
  const { todos } = state;
  const disable = true;

  const [todo, getTodo] = useResource(() => ({
    url: `/todos/${id}`,
    method: 'get',
  }));

  useEffect(getTodo, [todos]);

  return (
    <div>
      <div>
        <Link href="/">Go back</Link>
      </div>
      {todo && todo.data ? <Todo {...todo.data} disable={disable} /> : 'Loading...'}
    </div>
  );
}
