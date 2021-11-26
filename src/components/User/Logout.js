import React, { useContext } from 'react';
import { useNavigation } from 'react-navi';
import '../../style.css';
import StateContext from '../../store/Contexts';

function Logout() {
  const { state, dispatch } = useContext(StateContext);
  const { user } = state;
  const navigation = useNavigation();
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        dispatch({ type: 'LOGOUT' });
        navigation.navigate('/');
      }}
    >
      Logged in as: <b>{user.username}</b>
      <input className="tab" type="submit" value="Logout" />
    </form>
  );
}

export default Logout;
