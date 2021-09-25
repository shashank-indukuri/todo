import React from 'react';
import Todo from './Todo';

/**
 * This Component loops the todo list and return its child component for each Todo
 * @param todos holds the todo list, by default empty
 */

function TodoList({ todos = [], setTodos }) {
  const handleTodo = (todo) => {
    const prevTodos = todos.filter((t) => t.id !== todo.id);
    const updatedTodos = [...prevTodos, todo];
    updatedTodos.sort((a, b) => (a.id < b.id ? 1 : -1));
    setTodos(updatedTodos);
  };

  return (
    <div>
      {todos
        .sort((a, b) => (a.id < b.id ? 1 : -1))
        .map((todo) => (
          <Todo key={todo.id} {...todo} handleTodo={handleTodo} />
        ))}
    </div>
  );
}

export default TodoList;
