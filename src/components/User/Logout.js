import React from 'react';
import '../../style.css';

/**
 * This Component is used to logout the exisitng user and empty the todos list
 * @param user  Holds the current login user
 * @param setUser Used to clear the state of user
 * @param setTodos Used to clear the state of todos
 */

function Logout({ user, setUser, setTodos }) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setUser('');
        setTodos([]);
      }}
    >
      Logged in as: <b>{user}</b>
      <input className="tab" type="submit" value="Logout" />
    </form>
  );
}

export default Logout;
