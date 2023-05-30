import {
  Box,
  Container,
  Select,
  Table,
  Title,
  createStyles,
  rem,
} from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { IconCheck, IconChevronDown } from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, useAuth } from '../../contexts/AuthContext';

const useStyles = createStyles((theme) => ({
  wrapper: {
    flexDirection: 'column',
    alignItems: 'center',
    backgroundImage:
      theme.colorScheme === 'dark'
        ? `linear-gradient(-60deg, ${theme.colors.gray[8]} 0%, ${theme.colors.gray[9]} 100%)`
        : `linear-gradient(-60deg, ${theme.colors.gray[3]} 0%, ${theme.colors.gray[1]} 100%)`,
    padding: `calc(${theme.spacing.xl} * 5)`,
    minHeight: 'calc(100vh - 4.375rem)',
    [theme.fn.smallerThan('md')]: {
      padding: `calc(${theme.spacing.xl})`,
      paddingTop: '3rem',
      minHeight: 'calc(100vh - 4.375rem)',
    },
  },
  title: {
    fontSize: rem(50),
    [theme.fn.smallerThan('sm')]: {
      fontSize: rem(40),
    },
    color:
      theme.colorScheme === 'dark'
        ? theme.colors.blue[5]
        : theme.colors.gray[8],
    lineHeight: 1,
    marginBottom: '3rem',
  },
}));

export default function AdminUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const { setUser, user } = useAuth();
  const navigate = useNavigate();
  const session = user as User;

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
      notifications.show({
        icon: <IconCheck />,
        title: 'Success!',
        message: 'The users role has been updated',
        color: 'green',
        autoClose: 3000,
        withCloseButton: false,
      });

      // Sends user back to home if they update their own role to User
      if (session._id === user._id) {
        setUser(data.user);
        navigate('/');
      }
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

  const { classes } = useStyles();

  return (
    <Box className={classes.wrapper}>
      <Container p={0}>
        <Title ta="center" className={classes.title}>
          Admin - User Management
        </Title>
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
    </Box>
  );
}
