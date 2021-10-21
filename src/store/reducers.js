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
    case 'CREATE_TODO': {
      const filterTodo = state.filter((t) => t.id === action.newTodo.id);
      if (filterTodo.length === 0) {
        return [action.newTodo, ...state];
      }
      return state;
    }
    case 'TOGGLE_TODO': {
      return state.map((todo) => {
        const temp = todo;
        if (todo.id === action.id) {
          temp.complete = action.complete;
          temp.dateCompleted = action.dateCompleted;
        }
        return temp;
      });
    }
    case 'DELETE_TODO': {
      const afterDeleteTodos = state.filter((t) => t.id !== action.id);
      return [...afterDeleteTodos];
    }
    case 'FETCH_TODOS':
      return action.todos;
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
