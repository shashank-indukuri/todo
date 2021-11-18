import React, { useReducer, useEffect } from 'react';
import { useResource } from 'react-request-hook';
import UserCard from './components/User/UserCard';
import TodoList from './components/Todo/TodoList';
import CreateTodo from './components/Todo/CreateTodo';
import appReducer from './store/reducers';
import StateContext from './store/Contexts';

/**
 * This Component is the main container for our todo app
 */

function App() {
  const initialTodo = [];
  const [state, dispatch] = useReducer(appReducer, { user: {}, todos: initialTodo });
  const { user } = state;
  const [todos, getTodos] = useResource(() => ({
    url: `/users/${user.id}`,
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

  useEffect(() => {
    if (user) {
      document.title = `${user.username}’s To-Do`;
    } else {
      document.title = 'To-Do';
    }
  }, [user]);

  return (
    <div>
      <StateContext.Provider value={{ state, dispatch }}>
        <UserCard />
        <br />
        {user.username && <CreateTodo />}
        <TodoList />
        <br />
        <hr />
      </StateContext.Provider>
    </div>
  );
}

export default App;
