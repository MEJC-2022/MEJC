import {
  Accordion,
  Box,
  Container,
  Title,
  createStyles,
  rem,
} from '@mantine/core';
import { useEffect, useState } from 'react';
import { Order } from '../../components/UserOrderAcc';
import { useAuth } from '../../contexts/AuthContext';
import { Product } from '../../contexts/ProductContext';

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

  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [allOrders, setAllOrders] = useState<Order[]>([]);

  async function getAllCreatedProducts() {
    setLoading(true);
    if (!user) return;

    try {
      const response = await fetch('api/products/created', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const products = await response.json();
        setProducts(products);
      } else {
        const message = await response.text();
        setProducts([]);
        throw new Error(message);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  async function getUserOrders() {
    setLoading(true);

    try {
      const response = await fetch('api/orders', {
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
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getAllCreatedProducts();
    // getUserOrders();
  }, []);

  return (
    <Box className={classes.wrapper}>
      <Container>
        <Title ta="center" className={classes.title}>
          Admin - Order Management
        </Title>
        <Accordion transitionDuration={600} className={classes.accordion}>
          {/* {[...allOrders].reverse().map((order: Order) => (
            <AdminOrderAccordion
              order={order}
              products={products}
              key={order._id}
            />
          ))} */}
        </Accordion>
      </Container>
    </Box>
  );
}
