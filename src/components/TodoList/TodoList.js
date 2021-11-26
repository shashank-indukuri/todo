import React, { useContext, useEffect, useState } from 'react';
import { useResource } from 'react-request-hook';
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-navi';
import StateContext from '../../store/Contexts';

function TodoList({ id, title, description }) {
  const { state, dispatch } = useContext(StateContext);
  const { user } = state;
  const [updateFailed, setUpdateFailed] = useState(false);

  const [todoList, deleteTodo] = useResource((todoListId) => ({
    url: '/todoLists',
    method: 'delete',
    data: { id: todoListId },
    headers: { Authorization: `${user.access_token}` },
  }));

  useEffect(() => {
    if (todoList && (todoList.data || todoList.error) && todoList.isLoading === false) {
      if (todoList.error) {
        setUpdateFailed(true);
      } else {
        setUpdateFailed(false);
        dispatch({ type: 'DELETE_TODOLIST', id: todoList.data.id });
      }
    }
  }, [todoList]);

  const handleDelete = () => {
    deleteTodo(id);
  };

  return (
    <Card>
      <Card.Body>
        <Card.Title>
          <Link href={`/todoLists/${id}`}>{title}</Link>
        </Card.Title>
        <Card.Text>{description}</Card.Text>
        <Button variant="link" onClick={handleDelete}>
          Delete TodoList
        </Button>
        {updateFailed && (
          <Card.Text style={{ color: 'red' }}>Unauthorized, Please Login...</Card.Text>
        )}
      </Card.Body>
    </Card>
  );
}

export default TodoList;
