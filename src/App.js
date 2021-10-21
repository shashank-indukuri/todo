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
  const [state, dispatch] = useReducer(appReducer, { user: '', todos: initialTodo });
  const { user } = state;
  const [todos, getTodos] = useResource(() => ({
    url: '/todos',
    method: 'get',
  }));

  useEffect(getTodos, []);

  useEffect(() => {
    if (todos && todos.data) {
      dispatch({ type: 'FETCH_TODOS', todos: todos.data.reverse() });
    }
  }, [todos]);

  useEffect(() => {
    if (user) {
      document.title = `${user}’s To-Do`;
    } else {
      document.title = 'To-Do';
    }
  }, [user]);

  return (
    <div>
      <StateContext.Provider value={{ state, dispatch }}>
        <UserCard />
        <br />
        {user && <CreateTodo />}
        <TodoList />
        <br />
        <hr />
      </StateContext.Provider>
    </div>
  );
}

export default App;
