import React, { useContext, useEffect } from 'react';
import { useResource } from 'react-request-hook';
import StateContext from '../../store/Contexts';

/**
 * This Component is responsible for displaying each todo
 * @param {todo} todo contains all the fields of todo
 */

function Todo({ id, title, description, dateCreated, complete, dateCompleted }) {
  const { dispatch } = useContext(StateContext);
  // formatter for the date
  const dateFormat = new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });

  const [todo, deleteTodo] = useResource(() => ({
    url: `/todos/${id}`,
    method: 'delete',
  }));

  // eslint-disable-next-line no-shadow
  const [updateTodo, toggleTodo] = useResource(({ complete, dateCompleted }) => ({
    url: `/todos/${id}`,
    method: 'patch',
    data: { complete, dateCompleted },
  }));

  useEffect(() => {
    if (todo && todo.data !== undefined) {
      dispatch({ type: 'DELETE_TODO', id });
    }
  }, [todo]);

  useEffect(() => {
    if (updateTodo && updateTodo.data) {
      dispatch({
        type: 'TOGGLE_TODO',
        id: updateTodo.data.id,
        complete: updateTodo.data.complete,
        dateCompleted: updateTodo.data.dateCompleted,
      });
    }
  }, [updateTodo]);

  /**
   * This function calls back the parent funciton inorder to update the current todo
   * Here dateCompleted field is updated based on the checkbox
   */
  const handleChecked = (evt) => {
    let tempDate = null;
    if (evt.target.checked) {
      tempDate = Date.now();
    } else {
      tempDate = null;
    }
    toggleTodo({ complete: evt.target.checked, dateCompleted: tempDate });
  };

  const handleDelete = () => {
    deleteTodo();
  };

  return (
    <div>
      <hr />
      <span>
        <input type="checkbox" checked={complete} onChange={handleChecked} />
        <b>{title}</b>
      </span>
      <p>
        <i>{description}</i>
      </p>
      <p>Date Created: {dateFormat.format(dateCreated)} </p>
      {dateCompleted && <p>Date Completed: {dateFormat.format(dateCompleted)} </p>}
      <button type="button" onClick={handleDelete}>
        delete
      </button>
    </div>
  );
}

export default Todo;
