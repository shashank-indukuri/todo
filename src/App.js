import React, { useReducer, useEffect } from 'react';
import UserCard from './components/User/UserCard';
import TodoList from './components/Todo/TodoList';
import CreateTodo from './components/Todo/CreateTodo';
import appReducer from './store/reducers';

/**
 * This Component is the main container for our todo app
 */

function App() {
  const initialTodo = [];
  const [state, dispatch] = useReducer(appReducer, { user: '', todos: initialTodo });
  const { user, todos } = state;

  useEffect(() => {
    if (user) {
      document.title = `${user}’s To-Do`;
    } else {
      document.title = 'To-Do';
    }
  }, [user]);

  return (
    <div>
      <UserCard user={user} dispatch={dispatch} />
      <TodoList todos={todos} dispatch={dispatch} />
      <br />
      <hr />
      {user && <CreateTodo dispatch={dispatch} />}
    </div>
  );
}

export default App;
