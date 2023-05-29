import {
  Accordion,
  Center,
  Title,
  createStyles,
  rem,
  useMantineTheme,
} from '@mantine/core';
import { useEffect, useState } from 'react';
import { Order, UserOrderAccordion } from '../components/UserOrderAcc';
import { useAuth } from '../contexts/AuthContext';
import { Product } from '../contexts/ProductContext';

const useStyles = createStyles((theme) => ({
  wrapper: {
    margin: '1rem 0',
    flexDirection: 'column',
    backgroundImage:
      theme.colorScheme === 'dark'
        ? `linear-gradient(-60deg, ${theme.colors.gray[8]} 0%, ${theme.colors.gray[9]} 100%)`
        : `linear-gradient(-60deg, ${theme.colors.gray[1]} 0%, ${theme.colors.gray[3]} 100%)`,
    padding: `calc(${theme.spacing.xl} * 5)`,
    [theme.fn.smallerThan('sm')]: {
      padding: `calc(${theme.spacing.xl})`,
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
        : theme.colors.gray[7],
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
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [userOrders, setUserOrders] = useState<Order[]>([]);

  async function getAllCreatedOrders() {
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
        console.log(allUserOrders.fetchedListOfOrders);
      } else {
        const message = await response.text();
        setUserOrders([]);
        throw new Error(message);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getAllCreatedOrders();
    getUserOrders();
    console.log(products);
  }, []);

  return (
    <Center className={classes.wrapper}>
      <Title
        className={`${classes.title} ${
          theme.colorScheme === 'dark' ? 'neonText' : ''
        }`}
      >
        Order history
      </Title>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <Accordion transitionDuration={600} className={classes.accordion}>
          {[...userOrders].reverse().map((order: Order) => (
            <UserOrderAccordion
              order={order}
              products={products}
              key={order._id}
            />
          ))}
        </Accordion>
      )}
    </Center>
  );
}
