import React, { useContext, useEffect, useState } from 'react';
import { useResource } from 'react-request-hook';
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-navi';
import StateContext from '../../store/Contexts';

function Todo({
  id,
  title,
  description,
  dateCreated,
  complete,
  dateCompleted,
  author,
  short = false,
  disable = false,
}) {
  const { state, dispatch } = useContext(StateContext);
  const { user } = state;
  const [updateFailed, setUpdateFailed] = useState(false);
  // formatter for the date
  const dateFormat = new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });

  const [todo, deleteTodo] = useResource((todoId) => ({
    url: '/todos',
    method: 'delete',
    data: { id: todoId, author },
    headers: { Authorization: `${user.access_token}` },
  }));

  // eslint-disable-next-line no-shadow
  const [updateTodo, toggleTodo] = useResource(({ complete, dateCompleted }) => ({
    url: '/todos',
    method: 'patch',
    data: { id, complete, dateCompleted, author },
    headers: { Authorization: `${user.access_token}` },
  }));

  useEffect(() => {
    if (todo && (todo.data || todo.error) && todo.isLoading === false) {
      if (todo.error) {
        setUpdateFailed(true);
      } else {
        setUpdateFailed(false);
        dispatch({ type: 'DELETE_TODO', id: todo.data.id });
      }
    }
  }, [todo]);

  useEffect(() => {
    if (updateTodo && (updateTodo.data || updateTodo.error) && updateTodo.isLoading === false) {
      if (updateTodo.error) {
        setUpdateFailed(true);
      } else {
        setUpdateFailed(false);
        dispatch({
          type: 'TOGGLE_TODO',
          complete: updateTodo.data.complete,
          dateCompleted: updateTodo.data.dateCompleted,
          id,
        });
      }
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
    deleteTodo(id);
  };

  let processedContent = description;

  if (short) {
    if (description.length > 30) {
      processedContent = `${description.substring(0, 30)} ...`;
    }
  }

  return (
    <Card>
      <Card.Body>
        <Card.Title>
          <Link href={`/todo/${id}`}>{title}</Link>
        </Card.Title>
        <Card.Subtitle>
          <i>
            Written by <b>{user.username}</b>
          </i>
        </Card.Subtitle>
        <Card.Text>{processedContent}</Card.Text>
        <input type="checkbox" checked={complete} onChange={handleChecked} />
        <Button variant="link" disabled={disable} onClick={handleDelete}>
          Delete Todo
        </Button>
        <Card.Text>Created on: {dateFormat.format(dateCreated)}</Card.Text>
        {dateCompleted && <i>Completed on: {dateFormat.format(dateCompleted)}</i>}
        <br />
        {short && <Link href={`/todo/${id}`}>View full post</Link>}
        {updateFailed && (
          <Card.Text style={{ color: 'red' }}>Unauthorized, Please Login...</Card.Text>
        )}
      </Card.Body>
    </Card>
  );
}

export default Todo;
