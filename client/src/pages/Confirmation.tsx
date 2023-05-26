import { Card, Container, Divider, List, Text, Title } from '@mantine/core';
// import { useContext } from 'react';
import { FormValues } from '../components/CheckoutForm';
// import { ProductContext } from '../contexts/ProductContext';
import { useEffect } from 'react';
import useBackgroundAnimation from '../components/ConfirmationPageAnimation';
import { useShoppingCart } from '../contexts/ShoppingCartContext';

function Confirmation() {
  const { order, loading, setOrder } = useShoppingCart();
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
    <Container size="md" mt="xl" mb="xl">
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <>
          {!order ? (
            <Card shadow="md" sx={{ textAlign: 'center' }}>
              <Title order={1}>Something went wrong with your order!</Title>
              <Text>
                If the issue persists, try to remove items from your cart.
              </Text>
            </Card>
          ) : null}
          {order && formData && (
            <Card shadow="md" sx={{ textAlign: 'center' }}>
              <Title order={1}>Thank you for your order!</Title>
              <Divider mt="md" mb="sm" size="xs" />
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
              <h2>Total price: {calculateLastOrderTotal()}€</h2>
            </Card>
          )}
        </>
      )}
    </Container>
  );
}

export default Confirmation;
