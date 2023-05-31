import {
  Accordion,
  Box,
  Container,
  Select,
  Title,
  createStyles,
  rem,
} from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { useContext, useEffect, useState } from 'react';
import { AdminOrderAccordion } from '../../components/AdminOrderAcc';
import { Order } from '../../components/UserOrderAcc';
import { User } from '../../contexts/AuthContext';
import { ProductContext } from '../../contexts/ProductContext';

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
  accordion: {
    width: '100%',
    maxWidth: '1250px',
  },
}));

export default function AdminOrders() {
  const { classes } = useStyles();

  const [loading, setLoading] = useState(false);
  const [allOrders, setAllOrders] = useState<Order[]>([]);
  const { fetchAllCreatedProducts } = useContext(ProductContext);
  const [searchValue, onSearchChange] = useState('');
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const isSmallScreen = useMediaQuery('(max-width: 767px)');

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
    } catch (err) {
      console.log(err);
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
      console.log(err);
    } finally {
      setLoading(false);
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
      <Container sx={{ padding: '0' }}>
        <Title ta="center" className={classes.title}>
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
        <Accordion transitionDuration={600} className={classes.accordion}>
          {filteredOrders.map((order: Order) => (
            <AdminOrderAccordion order={order} key={order._id} />
          ))}
        </Accordion>
      </Container>
    </Box>
  );
}
