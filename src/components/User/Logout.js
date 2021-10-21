import React, { useContext } from 'react';
import '../../style.css';
import StateContext from '../../store/Contexts';

/**
 * This Component is used to logout the exisitng user and empty the todos list
 */

function Logout() {
  const { state, dispatch } = useContext(StateContext);
  const { user } = state;
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        dispatch({ type: 'LOGOUT' });
      }}
    >
      Logged in as: <b>{user}</b>
      <input className="tab" type="submit" value="Logout" />
    </form>
  );
}

export default Logout;
