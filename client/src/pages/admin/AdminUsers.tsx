import { Button, Container, Table } from '@mantine/core';
import { useEffect, useState } from 'react';
import { User } from '../../contexts/AuthContext';

export default function AdminUsers() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    fetch('/api/users')
      .then((response) => response.json())
      .then((data) => setUsers(data));
  }, []);

  const updateUserRole = async (user: User) => {
    try {
      const response = await fetch(`/api/users/${user._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          _id: user._id,
          email: user.email,
          isAdmin: !user.isAdmin,
          createdAt: new Date().toISOString(),
        }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();

      setUsers(
        users.map((currentUser) =>
          currentUser._id === user._id ? data.user : currentUser,
        ),
      );
    } catch (error) {
      console.error('Failed to update user role:', error);
    }
  };

  const rows = users.map((user) => (
    <tr key={user._id}>
      <td>{user.email}</td>
      <td>{user.isAdmin ? 'Admin' : 'User'}</td>
      <td>
        <Button onClick={() => updateUserRole(user)}>
          {user.isAdmin ? 'Change to User' : 'Change to Admin'}
        </Button>
      </td>
    </tr>
  ));

  return (
    <Container>
      <Table>
        <thead>
          <tr>
            <th>Email</th>
            <th>Role</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    </Container>
  );
}
