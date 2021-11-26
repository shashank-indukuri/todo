import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-navi';

function User({ id, username }) {
  return (
    <Card>
      <Card.Body>
        <Card.Title>
          <Link href={`/users/${id}`}>{username}</Link>
        </Card.Title>
      </Card.Body>
    </Card>
  );
}

export default User;
