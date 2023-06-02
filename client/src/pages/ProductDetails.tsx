import {
  Badge,
  Box,
  Button,
  Card,
  Container,
  Divider,
  Flex,
  Group,
  Image,
  Text,
  Title,
  useMantineTheme,
} from '@mantine/core';
import { useContext } from 'react';
import { Link, useParams } from 'react-router-dom';
import 'swiper/swiper-bundle.css';
import 'swiper/swiper.min.css';
import { ProductContext } from '../contexts/ProductContext';
import { useShoppingCart } from '../contexts/ShoppingCartContext';

function ProductDetails() {
  const { id } = useParams();
  const { products } = useContext(ProductContext);
  const product = products.find((p) => p._id === id);
  const { increaseCartQuantity } = useShoppingCart();

  const goBack = () => {
    window.history.back();
  };
  const theme = useMantineTheme();

  if (!product) {
    return (
      <Container>
        <Link to="/">
          <Button variant="outline">Go back</Button>
        </Link>
        <Title>Sorry! Product not found</Title>
      </Container>
    );
  }

  return (
    <Container size={'lg'}>
      <Button variant="outline" mb="sm" mt="sm" onClick={goBack}>
        Back to Store
      </Button>
      <Flex direction={{ base: 'column', sm: 'row' }}>
        <Card sx={{ flex: 1 }}>
          <Title align="center" mb={50} data-cy="product-title">
            {product.title}
          </Title>
          <Box sx={{ display: 'flex' }}>
            <Box
              mb="xs"
              mr="sm"
              sx={{
                background: theme.colors.blue[7],
                color: theme.colors.gray[1],
                width: '15%',
                borderRadius: '.2rem',
                display: 'flex',
                justifyContent: 'space-around',
                alignItems: 'center',
              }}
            ></Box>
          </Box>
          <Image
            radius="md"
            src={'/api/file/' + product.image}
            key={product._id}
            alt={product.title}
            fit="contain"
          />
          {product.stock === 0 ? (
            <Badge
              variant="gradient"
              gradient={{ from: 'orange', to: 'red' }}
              pos="absolute"
              top="33%"
              right="8%"
            >
              {product.stock === 0
                ? 'Out of stock'
                : `${product.stock} in stock`}
            </Badge>
          ) : (
            <Badge variant="gradient" pos="absolute" top="33%" right="8%">
              {product.stock} in stock
            </Badge>
          )}
        </Card>
        <Card sx={{ flex: 1 }}>
          <Box
            sx={{
              background: theme.colors.blue[7],
              color: theme.colors.gray[1],
              borderTopLeftRadius: '.5rem',
              borderBottomLeftRadius: '.5rem',
              padding: '.4rem',
            }}
          >
            <Title order={3} align="center">
              About this {product.title}
            </Title>
          </Box>
          <Text
            size="md"
            align="left"
            mt="md"
            data-cy="product-description"
            color={
              theme.colorScheme === 'dark'
                ? theme.colors.gray[5]
                : theme.colors.dark[8]
            }
          >
            {product.description}
          </Text>
          <Divider my="sm" variant="dotted" />
          <Group position="right">
            <Title
              order={2}
              data-cy="product-price"
              color={
                theme.colorScheme === 'dark'
                  ? theme.colors.gray[5]
                  : theme.colors.dark[8]
              }
            >
              {product.price} €
            </Title>
          </Group>
          <Button
            disabled={product.stock === 0}
            fullWidth
            variant="light"
            mt="md"
            radius="md"
            onClick={() => {
              increaseCartQuantity(product._id);
            }}
            data-cy="product-buy-button"
          >
            Add to cart
          </Button>
          <Link to="/checkout" style={{ textDecoration: 'none' }}>
            <Button
              fullWidth
              variant="outline"
              mt="md"
              radius="md"
              onClick={() => {
                increaseCartQuantity(product._id);
              }}
            >
              Buy now
            </Button>
          </Link>
        </Card>
      </Flex>
    </Container>
  );
}

export default ProductDetails;
