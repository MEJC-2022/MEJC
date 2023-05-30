import {
  Accordion,
  Box,
  Container,
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
import { useAuth } from '../../contexts/AuthContext';
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
  const { user } = useAuth();
  const theme = useMantineTheme();
  const [loading, setLoading] = useState(false);
  const [allOrders, setAllOrders] = useState<Order[]>([]);
  const { fetchAllCreatedProducts } = useContext(ProductContext);

  async function getAllOrders() {
    setLoading(true);

    try {
      const response = await fetch('/api/orders', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const allOrders = await response.json();
        setAllOrders(allOrders.orders);
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

  useEffect(() => {
    fetchAllCreatedProducts();
    getAllOrders();
  }, []);

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
        {loading ? (
          <div>Loading...</div>
        ) : (
          <Accordion transitionDuration={600} className={classes.accordion}>
            {[...allOrders].reverse().map((order: Order) => (
              <AdminOrderAccordion order={order} key={order._id} />
            ))}
          </Accordion>
        )}
      </Container>
    </Box>
  );
}
