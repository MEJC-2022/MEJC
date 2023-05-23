import { Card, Container, Divider, List, Text, Title } from '@mantine/core';
import { useContext } from 'react';
import { FormValues } from '../components/CheckoutForm';
import useBackgroundAnimation from '../components/ConfirmationPageAnimation';
import { ProductContext } from '../contexts/ProductContext';
import { useShoppingCart } from '../contexts/ShoppingCartContext';

function Confirmation() {
  const { products } = useContext(ProductContext);
  const { orders } = useShoppingCart();
  const lastOrder = orders[orders.length - 1];
  const formData = lastOrder.address as FormValues;

  function calculateLastOrderTotal() {
    return lastOrder.orderItems.reduce((total, item) => {
      if ('id' in item) {
        const product = products.find((i) => i.id === item.id);
        return total + (product?.price || 0) * item.quantity;
      }
      return total;
    }, 0);
  }
  useBackgroundAnimation();
  return (
    <Container size="md" mt="xl" mb="xl">
      {lastOrder && formData && (
        <Card shadow="md" sx={{ textAlign: 'center' }}>
          <Title order={1}>Thank you for your order!</Title>
          <Divider mt="md" mb="sm" size="xs" />
          <Text>We have sent a confirmation to: {formData.email}</Text>
          <Text>Your order number: {lastOrder.orderId}</Text>
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
            {lastOrder.orderItems.map(
              (product, index) =>
                'id' in product && (
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
    </Container>
  );
}

export default Confirmation;
