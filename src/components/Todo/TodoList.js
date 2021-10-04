import React from 'react';
import Todo from './Todo';

/**
 * This Component loops the todo list and return its child component for each Todo
 * @param todos holds the todo list, by default empty
 */

function TodoList({ todos, dispatch }) {
  return (
    <div>
      {todos
        .sort((a, b) => (a.id < b.id ? 1 : -1))
        .map((todo) => (
          <Todo key={todo.id} {...todo} dispatch={dispatch} />
        ))}
    </div>
  );
}

export default TodoList;
