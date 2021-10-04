/**
 * This reducer functions are used to manage the global state for User and Todo components
 */

function userReducer(state, action) {
  switch (action.type) {
    case 'LOGIN':
    case 'REGISTER':
      return action.username;
    case 'LOGOUT':
      return '';
    default:
      return state;
  }
}

function todoReducer(state, action) {
  switch (action.type) {
    case 'CREATE_TODO':
      return [action.newTodo, ...state];
    case 'TOGGLE_TODO': {
      const prevTodos = state.filter((t) => t.id !== action.updatedTodo.id);
      return [...prevTodos, action.updatedTodo];
    }
    case 'DELETE_TODO': {
      const afterDeleteTodos = state.filter((t) => t.id !== action.id);
      return [...afterDeleteTodos];
    }
    case 'CLEAR_TODOS':
      return [];
    default:
      return state;
  }
}

export default function appReducer(state, action) {
  return {
    user: userReducer(state.user, action),
    todos: todoReducer(state.todos, action),
  };
}
