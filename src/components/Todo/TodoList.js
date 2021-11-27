import React, { useContext } from 'react';
import Todo from './Todo';
import StateContext from '../../store/Contexts';

/**
 * This Component loops the todo list and return its child component for each Todo
 */

function TodoList() {
  const { state } = useContext(StateContext);
  const { todos } = state;
  const short = true;
  return (
    <div>
      {todos.length > 0 && <h5>Todos</h5>}
      {todos.length === 0 && <i>No todos to display. Create a new one...</i>}
      {todos.map((todo) => (
        <Todo key={todo.id} {...todo} short={short} />
      ))}
    </div>
  );
}

export default TodoList;
