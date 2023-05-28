import {
  Badge,
  Box,
  Button,
  Card,
  Group,
  Image,
  Text,
  Title,
  useMantineTheme,
} from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { IconShoppingCartPlus } from '@tabler/icons-react';
import { Link } from 'react-router-dom';
import { Product } from '../contexts/ProductContext';
import { useShoppingCart } from '../contexts/ShoppingCartContext';

export interface Props {
  product: Product;
}

function ProductCard({ product }: Props) {
  const { increaseCartQuantity } = useShoppingCart();
  const link = '/product/' + product._id;
  const theme = useMantineTheme();

  return (
    <>
      <Card
        shadow="xl"
        radius="lg"
        withBorder
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
        data-cy="product"
      >
        <Card.Section>
          <Link to={link} style={{ textDecoration: 'none', color: 'inherit' }}>
            <Image
              src={'/api/file/' + product.image}
              height={230}
              fit="cover"
            />
            <Box pl="md" pr="md">
              <Group
                mt="xl"
                mb="xl"
                style={{ display: 'flex', justifyContent: 'space-between' }}
              >
                <Title order={2} data-cy="product-title">
                  {product.title}
                </Title>
                {new Date().getTime() - new Date(product.createdAt).getTime() <
                  48 * 60 * 60 * 1000 && (
                  <Badge color="blue" variant="light" size="lg">
                    New!
                  </Badge>
                )}
              </Group>
              <Text size="md" align="left">
                {product.description}
              </Text>
              <Group
                mt="lg"
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  placeItems: 'center',
                  textAlign: 'center',
                }}
              >
                {product.categories.length > 0 && (
                  <Badge size="md">
                    {product.categories
                      .map((category) => category.title)
                      .join(' | ')}
                  </Badge>
                )}
                <Badge variant="gradient">{product.stock} in stock</Badge>
              </Group>
            </Box>
          </Link>
        </Card.Section>
        <Group position="left" mt="md" mb="xs">
          <Link to={link}>
            <Button variant="outline" mt="md" radius="md">
              Product Page
            </Button>
          </Link>
          <Button
            disabled={product.stock === 0}
            variant="light"
            mt="md"
            radius="md"
            className={theme.colorScheme === 'dark' ? 'buttonGlow' : ''}
            onClick={() => {
              increaseCartQuantity(product._id);
              notifications.show({
                icon: <IconShoppingCartPlus />,
                title: `${product.title}`,
                message: 'has been added',
              });
            }}
            data-cy="product-buy-button"
          >
            Add to cart
          </Button>
          <Title
            style={{ marginLeft: 'auto', marginTop: '.5rem' }}
            order={2}
            align="left"
            data-cy="product-price"
          >
            {product.price}€
          </Title>
        </Group>
      </Card>
    </>
  );
}

export default ProductCard;
