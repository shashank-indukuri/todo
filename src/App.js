import React, { useReducer, useEffect } from 'react';
import { mount, route } from 'navi';
import { Router, View } from 'react-navi';
import { Container } from 'react-bootstrap';
import appReducer from './store/reducers';
import StateContext from './store/Contexts';
import HeaderBar from './pages/HeaderBar';
import HomePage from './pages/HomePage';
import CreateTodo from './components/Todo/CreateTodo';
import TodoPage from './pages/TodoPage';
import UserPage from './pages/UserPage';
import ProfilePage from './pages/ProfilePage';
import TodoListPage from './pages/TodoListPage';
import CreateTodoList from './components/TodoList/CreateTodoList';

/**
 * This Component is the main container for our todo app
 */

function App() {
  const initialTodo = [];
  const [state, dispatch] = useReducer(appReducer, {
    user: {},
    todos: initialTodo,
    users: [],
    todoLists: [],
  });
  const { user } = state;

  const routes = mount({
    '/': route({ view: <HomePage /> }),
    '/users': route({ view: <UserPage /> }),
    '/users/:userId': route((req) => ({ view: <ProfilePage id={req.params.userId} /> })),
    '/todoList/:todoListId/todo/create': route((req) => ({
      view: <CreateTodo todoListId={req.params.todoListId} />,
    })),
    '/todo/:id': route((req) => ({ view: <TodoPage id={req.params.id} /> })),
    '/todoLists/:todoListId': route((req) => ({
      view: <TodoListPage id={req.params.todoListId} />,
    })),
    '/todoLists/create': route({ view: <CreateTodoList /> }),
  });

  useEffect(() => {
    if (user.username) {
      document.title = `${user.username}’s To-Do`;
    } else {
      document.title = 'To-Do';
    }
  }, [user]);

  return (
    <div>
      <StateContext.Provider value={{ state, dispatch }}>
        <Router routes={routes}>
          <Container>
            <HeaderBar />
            <hr />
            <View />
          </Container>
        </Router>
      </StateContext.Provider>
    </div>
  );
}

export default App;
