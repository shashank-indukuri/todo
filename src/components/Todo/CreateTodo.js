import React, { useState, useContext, useEffect } from 'react';
import { useNavigation } from 'react-navi';
import { useResource } from 'react-request-hook';
import StateContext from '../../store/Contexts';

/**
 * This Component helps to create a new todo and adds to the exisiting list
 */

function CreateTodo() {
  const { state, dispatch } = useContext(StateContext);
  const { user } = state;
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const navigation = useNavigation();

  const [todo, createTodo] = useResource(
    // eslint-disable-next-line no-shadow
    ({ title, description, dateCreated, complete, dateCompleted }) => ({
      url: '/todos',
      method: 'post',
      headers: { Authorization: `${user.access_token}` },
      data: { title, description, dateCreated, complete, dateCompleted, author: user.id },
    })
  );

  useEffect(() => {
    if (todo && todo.data && todo.isLoading === false) {
      const newTodo = {
        id: todo.data.id,
        title: todo.data.title,
        description: todo.data.description,
        dateCreated: todo.data.dateCreated,
        complete: todo.data.complete,
        dateCompleted: todo.data.dateCompleted,
        author: todo.data.author,
      };
      dispatch({
        type: 'CREATE_TODO',
        newTodo,
      });
      navigation.navigate(`/todo/${todo.data.id}`);
    }
  }, [todo]);

  const handleTitle = (evt) => {
    setTitle(evt.target.value);
  };

  const handleDescription = (evt) => {
    setDescription(evt.target.value);
  };

  const handleCreate = () => {
    createTodo({
      title,
      description,
      dateCreated: Date.now(),
      complete: false,
      dateCompleted: null,
    });
    setTitle('');
    setDescription('');
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleCreate();
      }}
    >
      <div>
        <label htmlFor="create-title">Title:</label>
        <input
          type="text"
          id="create-title"
          value={title}
          onChange={handleTitle}
          name="create-title"
        />
      </div>
      <br />
      <textarea value={description} onChange={handleDescription} placeholder="Description" />
      <br />
      <input type="submit" value="Create" disabled={title.length === 0} />
    </form>
  );
}

export default CreateTodo;
