import { Container, Select, Table } from '@mantine/core';
import { IconChevronDown } from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import { User } from '../../contexts/AuthContext';

export default function AdminUsers() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    fetch('/api/users')
      .then((response) => response.json())
      .then((data) => setUsers(data));
  }, []);

  const updateUserRole = async (user: User, newRole: string) => {
    const isAdmin = newRole === 'Admin';

    try {
      const response = await fetch(`/api/users/${user._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          _id: user._id,
          email: user.email,
          isAdmin,
          createdAt: new Date().toISOString(),
        }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();

      // Update local state with the updated user data
      setUsers(
        users.map((currentUser) =>
          currentUser._id === user._id ? data.user : currentUser,
        ),
      );
    } catch (error) {
      console.error('Failed to update user role:', error);
    }
  };

  const handleRoleChange = (user: User) => (newRole: string) => {
    updateUserRole(user, newRole);
  };

  const rows = users.map((user) => (
    <tr key={user._id}>
      <td>{user.email}</td>
      <td>
        <Select
          ta="left"
          variant="unstyled"
          rightSection={<IconChevronDown size="1rem" />}
          styles={{ rightSection: { pointerEvents: 'none' } }}
          value={user.isAdmin ? 'Admin' : 'User'}
          onChange={handleRoleChange(user)}
          data={[
            { value: 'User', label: 'User' },
            { value: 'Admin', label: 'Admin' },
          ]}
        />
      </td>
    </tr>
  ));

  return (
    <Container sx={{ display: 'flex', justifyContent: 'center' }}>
      <Table highlightOnHover verticalSpacing="md">
        <thead>
          <tr>
            <th>Email</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    </Container>
  );
}
