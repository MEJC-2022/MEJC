import {
  Accordion,
  Box,
  Text,
  Title,
  createStyles,
  rem,
  useMantineTheme,
} from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { IconServerBolt } from '@tabler/icons-react';
import { useContext, useEffect, useState } from 'react';
import { Order, UserOrderAccordion } from '../components/UserOrderAcc';
import { useAuth } from '../contexts/AuthContext';
import { ProductContext } from '../contexts/ProductContext';

const useStyles = createStyles((theme) => ({
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundImage:
      theme.colorScheme === 'dark'
        ? `linear-gradient(-60deg, ${theme.colors.gray[8]} 0%, ${theme.colors.gray[9]} 100%)`
        : `linear-gradient(-60deg, ${theme.colors.blue[3]} 0%, ${theme.colors.blue[7]} 100%)`,
    padding: `calc(${theme.spacing.xl} * 5)`,
    minHeight: 'calc(100vh - 4.375rem - 13rem)',

    [theme.fn.smallerThan('sm')]: {
      minHeight: 'calc(100vh - 4.375rem - 23.8rem)',
      padding: `calc(${theme.spacing.xl} * 2)`,
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
        : theme.colors.gray[1],
    lineHeight: 1,
    marginBottom: `calc(${theme.spacing.xl} * 1.5)`,
  },
  accordion: {
    width: '100%',
    maxWidth: '1250px',
  },
}));

export default function UserOrders() {
  const theme = useMantineTheme();
  const { classes } = useStyles();
  const { user } = useAuth();

  const [loading, setLoading] = useState(true);
  const [userOrders, setUserOrders] = useState<Order[]>([]);
  const { fetchAllCreatedProducts } = useContext(ProductContext);

  async function getUserOrders() {
    if (!user) return;

    try {
      const response = await fetch(`api/orders/user/${user._id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const allUserOrders = await response.json();
        setUserOrders(allUserOrders.fetchedListOfOrders);
      } else {
        const message = await response.text();
        setUserOrders([]);
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

  useEffect(() => {
    fetchAllCreatedProducts();
    getUserOrders();
  }, []);

  return (
    <Box className={classes.wrapper}>
      <Title
        align="center"
        className={`${classes.title} ${
          theme.colorScheme === 'dark' ? 'neonText' : ''
        }`}
      >
        Order history
      </Title>
      {loading ? (
        <Text align="center">Loading...</Text>
      ) : (
        <Accordion transitionDuration={600} className={classes.accordion}>
          {userOrders.length === 0 ? (
            <Text align="center">
              No orders found. Make your first purchase today!
            </Text>
          ) : (
            [...userOrders]
              .reverse()
              .map((order: Order) => (
                <UserOrderAccordion order={order} key={order._id} />
              ))
          )}
        </Accordion>
      )}
    </Box>
  );
}
