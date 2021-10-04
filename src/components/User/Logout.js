import React from 'react';
import '../../style.css';

/**
 * This Component is used to logout the exisitng user and empty the todos list
 * @param user  Holds the current login user
 * @param dispatch LOGOUT, CLEAR_TODOS used to  logout, clear the state of user and existing todos
 */

function Logout({ user, dispatch }) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        dispatch({ type: 'LOGOUT' });
        dispatch({ type: 'CLEAR_TODOS' });
      }}
    >
      Logged in as: <b>{user}</b>
      <input className="tab" type="submit" value="Logout" />
    </form>
  );
}

export default Logout;
