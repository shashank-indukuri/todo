import React, { useState } from 'react';
import nextId from 'react-id-generator';

/**
 * This Component helps to create a new todo and adds to the exisiting list
 * @param dispatch CREATE_TODO to create a new todo
 */

function CreateTodo({ dispatch }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleTitle = (evt) => {
    setTitle(evt.target.value);
  };

  const handleDescription = (evt) => {
    setDescription(evt.target.value);
  };

  const handleCreate = (evt) => {
    evt.preventDefault();
    // creating a new todo object and maintaing a unique id for each one
    const newTodo = {
      id: nextId(),
      title,
      description,
      dateCreated: Date.now(),
      complete: false,
      dateCompleted: null,
    };
    setTitle('');
    setDescription('');
    dispatch({ type: 'CREATE_TODO', newTodo });
  };

  return (
    <form onSubmit={handleCreate}>
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
