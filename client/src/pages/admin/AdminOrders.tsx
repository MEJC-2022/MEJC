import {
  Accordion,
  Box,
  Container,
  Select,
  Text,
  Title,
  createStyles,
  rem,
  useMantineTheme,
} from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { IconServerBolt } from '@tabler/icons-react';
import { useContext, useEffect, useState } from 'react';
import { AdminOrderAccordion } from '../../components/AdminOrderAcc';
import { Order } from '../../components/UserOrderAcc';
import { User } from '../../contexts/AuthContext';
import { ProductContext } from '../../contexts/ProductContext';
import '../../css/Glow.css';

const useStyles = createStyles((theme) => ({
  wrapper: {
    flexDirection: 'column',
    alignItems: 'center',
    backgroundImage:
      theme.colorScheme === 'dark'
        ? `linear-gradient(-60deg, ${theme.colors.gray[8]} 0%, ${theme.colors.gray[9]} 100%)`
        : `linear-gradient(-60deg, ${theme.colors.gray[3]} 0%, ${theme.colors.gray[1]} 100%)`,
    padding: `calc(${theme.spacing.xl} * 3)`,
    minHeight: 'calc(100vh - 4.375rem)',
    [theme.fn.smallerThan('md')]: {
      padding: '50px 0px 0 0px',
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
  accordion: {
    width: '100%',
    maxWidth: '1250px',
  },
}));

export default function AdminOrders() {
  const { classes } = useStyles();
  const theme = useMantineTheme();
  const [loading, setLoading] = useState(true);
  const [allOrders, setAllOrders] = useState<Order[]>([]);
  const { fetchAllCreatedProducts } = useContext(ProductContext);
  const [searchValue, onSearchChange] = useState('');
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [users, setUsers] = useState<User[]>([]);

  async function getAllOrders() {
    try {
      const response = await fetch('/api/orders', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const allOrders = await response.json();
        setAllOrders(allOrders.orders.reverse());
      } else {
        const message = await response.text();
        setAllOrders([]);
        throw new Error(message);
      }
    } catch (error) {
      notifications.show({
        icon: <IconServerBolt size={20} />,
        title: 'Error',
        message: 'Failed to fetch orders',
        color: 'red',
        autoClose: false,
      });
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  }

  async function getUsers() {
    setLoading(true);
    try {
      const response = await fetch('/api/users', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const allUsers = await response.json();
        setUsers(allUsers);
      } else {
        const message = await response.text();
        setUsers([]);
        throw new Error(message);
      }
    } catch (err) {
      notifications.show({
        icon: <IconServerBolt size={20} />,
        title: 'Error',
        message: 'Failed to fetch users',
        color: 'red',
        autoClose: false,
      });
      console.error(err);
    }
  }

  useEffect(() => {
    getUsers();
    fetchAllCreatedProducts();
    getAllOrders();
  }, []);

  const handleSelectChange = (value: string) => {
    setSelectedUserId(value);
  };

  const filteredOrders = selectedUserId
    ? allOrders.filter((order) => order.userId === selectedUserId)
    : allOrders;

  const uniqueUsers = Array.from(
    new Set(allOrders.map((order) => order.userId)),
  );

  const uniqueUserOptions = [
    { value: '', label: 'All Users' },
    ...uniqueUsers.map((userId) => {
      const user = users.find((user) => user._id === userId);
      return {
        value: userId,
        label: user ? user.email : userId,
      };
    }),
  ];
  return (
    <Box className={classes.wrapper}>
      <Container>
        <Title
          ta="center"
          className={`${classes.title} ${
            theme.colorScheme === 'dark' ? 'neonText' : ''
          }`}
        >
          Admin - Order Management
        </Title>
        <Container sx={{ display: 'flex', justifyContent: 'center' }}>
          <Select
            label="Select a user"
            placeholder="Showing all users"
            onSearchChange={onSearchChange}
            searchValue={searchValue}
            nothingFound="No options"
            data={uniqueUserOptions}
            value={selectedUserId}
            onChange={handleSelectChange}
            sx={{
              marginBottom: '2rem',
              width: '50%',
              minWidth: '15rem',
              maxWidth: '30rem',
            }}
          />
        </Container>
        {loading ? (
          <Text align="center">Loading...</Text>
        ) : (
          <Accordion transitionDuration={600} className={classes.accordion}>
            {filteredOrders.length === 0 ? (
              <Text align="center">No orders found.</Text>
            ) : (
              [...filteredOrders]
                .reverse()
                .map((order: Order) => (
                  <AdminOrderAccordion order={order} key={order._id} />
                ))
            )}
          </Accordion>
        )}
      </Container>
    </Box>
  );
}
