import React, { useEffect } from 'react';
import { useResource } from 'react-request-hook';
import { Link } from 'react-navi';
import Todo from '../components/Todo/Todo';

export default function TodoPage({ id }) {
  const [todo, getTodo] = useResource(() => ({
    url: `/todos/${id}`,
    method: 'get',
  }));

  useEffect(getTodo, [id]);

  return (
    <div>
      <div>
        <Link href="/">Go back</Link>
      </div>
      {todo && todo.data ? <Todo {...todo.data} /> : 'Loading...'}
    </div>
  );
}
