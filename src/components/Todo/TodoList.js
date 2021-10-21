import React, { useContext } from 'react';
import Todo from './Todo';
import StateContext from '../../store/Contexts';

/**
 * This Component loops the todo list and return its child component for each Todo
 */

function TodoList() {
  const { state } = useContext(StateContext);
  const { todos } = state;
  return (
    <div>
      {todos.map((todo) => (
        <Todo key={todo.id} {...todo} />
      ))}
    </div>
  );
}

export default TodoList;
