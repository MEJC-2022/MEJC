import { Box, Button, Group, Image, Input, Text } from '@mantine/core';
import { IconMinus, IconPlus } from '@tabler/icons-react';
import { useContext } from 'react';
import { CartItem, ProductContext } from '../contexts/ProductContext';
import { useShoppingCart } from '../contexts/ShoppingCartContext';

interface Props {
  cartItem: CartItem;
}

function CartProduct({ cartItem }: Props) {
  const { products } = useContext(ProductContext);
  const { increaseCartQuantity, decreaseCartQuantity } = useShoppingCart();
  products.find((i) => i._id === cartItem._id);

  return (
    <Box
      mt="sm"
      p="sm"
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        '@media(max-width:1000px)': {
          flexDirection: 'column',
          justifyContent: '',
          alignItems: 'center',
        },
      }}
      data-cy="cart-item"
    >
      <Image
        src={'/api/file/' + cartItem.image}
        height={150}
        width={220}
        fit="cover"
        radius="md"
      />

      <Group pl="xs" pr="xs" mt="sm" mb="sm">
        <Text
          weight={500}
          size={20}
          transform="uppercase"
          data-cy="product-title"
          style={{
            textAlign: 'center',
            minWidth: '20rem',
            maxWidth: '20rem',
          }}
        >
          {cartItem.title}
        </Text>
      </Group>
      <Group
        sx={{
          '@media(max-width:1000px)': {
            flexDirection: 'column-reverse',
            alignItems: 'center',
          },
        }}
      >
        <Group sx={{ display: 'flex', minWidth: '14rem' }} position="center">
          <Button
            variant="light"
            mt="sm"
            radius="sm"
            onClick={() => decreaseCartQuantity(cartItem._id)}
            data-cy="decrease-quantity-button"
          >
            <IconMinus size={19} stroke="0.1rem" />
          </Button>
          <Input
            data-cy="product-quantity"
            mt="sm"
            readOnly
            variant="unstyled"
            type="number"
            value={cartItem.quantity}
            rightSectionWidth="0px"
            sx={{
              width: '1.2rem',
            }}
          />
          <Button
            variant="light"
            mt="sm"
            radius="md"
            onClick={() => increaseCartQuantity(cartItem._id)}
            data-cy="increase-quantity-button"
          >
            <IconPlus size={19} stroke="0.1rem" />
          </Button>
        </Group>
        <Group position="center" mt="xs" mb="xs">
          <Text
            mt="sm"
            weight={700}
            size={15}
            data-cy="product-price"
            sx={{
              textAlign: 'center',
              minWidth: '7rem',
            }}
          >
            Price: €{cartItem.price * cartItem.quantity}
          </Text>
        </Group>
      </Group>
    </Box>
  );
}

export default CartProduct;
