import React, { useContext } from 'react';
import TodoList from './TodoList';
import StateContext from '../../store/Contexts';

function TodoLists() {
  const { state } = useContext(StateContext);
  const { todoLists } = state;
  return (
    <div>
      {todoLists.length > 0 && <h5>Todo Lists</h5>}
      {todoLists.map((todoList) => (
        <TodoList key={todoList.id} {...todoList} />
      ))}
    </div>
  );
}

export default TodoLists;
