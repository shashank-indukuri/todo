import React from 'react';

/**
 * This Component is responsible for displaying each tood
 * @param {todo} todo contains all the fields of todo
 * @param handleTodo callback of the parent function
 */

function Todo({ id, title, description, dateCreated, complete, dateCompleted, handleTodo }) {
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
    handleTodo({
      id,
      title,
      description,
      dateCreated,
      complete: evt.target.checked,
      dateCompleted: tempDate,
    });
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
    </div>
  );
}

export default Todo;
