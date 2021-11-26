import React, { useContext } from 'react';
import { Link } from 'react-navi';

import { Navbar, Nav, Container } from 'react-bootstrap';

import UserBar from '../components/User/UserCard';
import Header from '../components/Header';
import StateContext from '../store/Contexts';

export default function HeaderBar() {
  const { state } = useContext(StateContext);
  const { user } = state;

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="/">
          <Header text="My Blog" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link>
              <Link href="/users">Users</Link>
            </Nav.Link>
            {user.username && (
              <Nav.Link>
                <Link href="/todoLists/create">Create New TodoList</Link>
              </Nav.Link>
            )}
          </Nav>
          <React.Suspense fallback="Loading...">
            <UserBar />
          </React.Suspense>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
