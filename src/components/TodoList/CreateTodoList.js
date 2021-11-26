import React, { useState, useContext, useEffect } from 'react';
import { useNavigation } from 'react-navi';
import { useResource } from 'react-request-hook';
import StateContext from '../../store/Contexts';

function CreateTodoList() {
  const { state, dispatch } = useContext(StateContext);
  const { user } = state;
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const navigation = useNavigation();

  const [todoList, createTodoList] = useResource(
    // eslint-disable-next-line no-shadow
    ({ title, description }) => ({
      url: '/todoLists',
      method: 'post',
      headers: { Authorization: `${user.access_token}` },
      data: { title, description, author: user.id },
    })
  );

  useEffect(() => {
    if (todoList && todoList.data && todoList.isLoading === false) {
      const newTodo = {
        id: todoList.data.id,
        title: todoList.data.title,
        description: todoList.data.description,
        author: todoList.data.author,
      };
      dispatch({
        type: 'CREATE_TODO',
        newTodo,
      });
      navigation.navigate(`/todoLists/${todoList.data.id}`);
    }
  }, [todoList]);

  const handleTitle = (evt) => {
    setTitle(evt.target.value);
  };

  const handleDescription = (evt) => {
    setDescription(evt.target.value);
  };

  const handleCreate = () => {
    createTodoList({
      title,
      description,
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

export default CreateTodoList;
