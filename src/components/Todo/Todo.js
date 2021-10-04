import React from 'react';

/**
 * This Component is responsible for displaying each tood
 * @param {todo} todo contains all the fields of todo
 * @param dispatch TOGGLE_TODO and DELETE_TODO to alter the complete field and delete the todo
 */

function Todo({ id, title, description, dateCreated, complete, dateCompleted, dispatch }) {
  // formatter for the date
  const dateFormat = new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });

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
    const updatedTodo = {
      id,
      title,
      description,
      dateCreated,
      complete: evt.target.checked,
      dateCompleted: tempDate,
    };
    dispatch({ type: 'TOGGLE_TODO', updatedTodo });
  };

  const handleDelete = () => {
    dispatch({ type: 'DELETE_TODO', id });
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
