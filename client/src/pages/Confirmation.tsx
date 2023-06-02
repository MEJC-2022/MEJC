import {
  Box,
  Card,
  Container,
  Divider,
  List,
  Text,
  Title,
  createStyles,
  rem,
  useMantineTheme,
} from '@mantine/core';
import { useEffect } from 'react';
import { FormValues } from '../components/CheckoutForm';
import { useShoppingCart } from '../contexts/ShoppingCartContext';
import useBackgroundAnimation from '../utils/ConfirmationPageAnimation';

const useStyles = createStyles((theme) => ({
  wrapper: {
    boxSizing: 'border-box',
    backgroundImage:
      theme.colorScheme === 'dark'
        ? `linear-gradient(-60deg, ${theme.colors.gray[8]} 0%, ${theme.colors.gray[9]} 100%)`
        : `linear-gradient(-60deg, ${theme.colors.blue[3]} 0%, ${theme.colors.blue[7]} 100%)`,
    padding: `calc(${theme.spacing.xl} * 4)`,
    minHeight: 'calc(100vh - 4.375rem - 10rem)',

    [theme.fn.smallerThan('sm')]: {
      minHeight: 'calc(100vh - 4.375rem - 19.8rem)',
      padding: `calc(${theme.spacing.xl} * 3)`,
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
}));

function Confirmation() {
  const { order, loading, setOrder } = useShoppingCart();
  const theme = useMantineTheme();
  const { classes } = useStyles();

  useEffect(() => {
    setOrder(null);

    return () => {
      setOrder(null);
    };
  }, [setOrder]);

  const formData = order?.address as FormValues;

  function calculateLastOrderTotal() {
    if (!order) {
      return null;
    }
    return order.orderItems.reduce((total, item) => {
      if ('_id' in item) {
        return total + (item.price || 0) * item.quantity;
      }

      return total;
    }, 0);
  }

  useBackgroundAnimation(!!order && !!formData);

  return (
    <Box className={classes.wrapper}>
      <Container size="md" pt="xl" pb="xl">
        {loading ? (
          <h1>Loading...</h1>
        ) : (
          <>
            {!order ? (
              <Box
                sx={{
                  textAlign: 'center',
                }}
              >
                <Title className={classes.title} order={1}>
                  Something went wrong with your order!
                </Title>
                <Text>
                  If the issue persists, try to remove items from your cart.
                </Text>
              </Box>
            ) : null}
            {order && formData && (
              <Card
                sx={{
                  borderRadius: theme.radius.md,
                  textAlign: 'center',
                }}
              >
                <Title size={50} mt={20} mb={10} order={1}>
                  Thank you for your order!
                </Title>

                <Text>We have sent a confirmation to: {formData.email}</Text>
                <Divider mt="md" mb="sm" size="xs" />
                <Title mb="xs" order={2}>
                  Order details:
                </Title>
                <Text>First name: {formData.firstName}</Text>
                <Text>Last name: {formData.lastName}</Text>
                <Text>Email: {formData.email}</Text>
                <Text>Street: {formData.street}</Text>
                <Text>Zip Code: {formData.zipCode}</Text>
                <Text>Phone Number: {formData.phoneNumber}</Text>
                <Text>City: {formData.city}</Text>
                <Divider mt="md" mb="sm" size="xs" />
                <Title mb="xs" order={2}>
                  Ordered Products
                </Title>
                <List listStyleType="none">
                  {order.orderItems.map(
                    (product, index) =>
                      '_id' in product && (
                        <List.Item key={index}>
                          {product.title} - {product.price} € - Quantity:{' '}
                          {product.quantity}
                        </List.Item>
                      ),
                  )}
                </List>
                <Divider mt="lg" mb="sm" size="xs" />
                <h2>Total price: {calculateLastOrderTotal()} €</h2>
              </Card>
            )}
          </>
        )}
      </Container>
    </Box>
  );
}

export default Confirmation;
