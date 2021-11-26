import React, { useContext } from 'react';
import TodoList from './TodoList';
import StateContext from '../../store/Contexts';

function TodoLists() {
  const { state } = useContext(StateContext);
  const { todoLists } = state;
  return (
    <div>
      {todoLists.map((todoList) => (
        <TodoList key={todoList.id} {...todoList} />
      ))}
    </div>
  );
}

export default TodoLists;
