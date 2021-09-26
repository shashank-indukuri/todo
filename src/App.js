import React, { useState } from 'react';
import UserCard from './components/User/UserCard';
import TodoList from './components/Todo/TodoList';
import CreateTodo from './components/Todo/CreateTodo';

/**
 * This Component is the main container for our todo app
 */

function App() {
  const initialTodo = [];
  const [user, setUser] = useState('');
  const [todos, setTodos] = useState(initialTodo);
  return (
    <div>
      <UserCard user={user} setUser={setUser} setTodos={setTodos} />
      <TodoList todos={todos} setTodos={setTodos} />
      <br />
      <hr />
      {user && <CreateTodo todos={todos} setTodos={setTodos} />}
    </div>
  );
}

export default App;
