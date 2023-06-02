import {
  Badge,
  Box,
  Button,
  Card,
  Group,
  Image,
  Skeleton,
  Text,
  Title,
  useMantineTheme,
} from '@mantine/core';
import { useState } from 'react';
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
  const [isLoadingImage, setLoadingImage] = useState(true);
  const [isImageError, setImageError] = useState(false);

  const handleLoad = () => {
    setLoadingImage(false);
    setImageError(false);
  };

  const handleError = () => {
    setLoadingImage(false);
    setImageError(true);
  };

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
            <Skeleton
              height={230}
              sx={isLoadingImage ? {} : { display: 'none' }}
            />
            <Skeleton
              height={230}
              sx={isImageError ? {} : { display: 'none' }}
              animate={false}
            />
            <Image
              sx={isLoadingImage || isImageError ? { display: 'none' } : {}}
              src={'/api/file/' + product.image}
              height={230}
              fit="cover"
              onLoad={handleLoad}
              onError={handleError}
            />
            <Box pl="md" pr="md">
              <Group
                mt="lg"
                pos="absolute"
                top="0%"
                right="3%"
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  placeItems: 'center',
                  textAlign: 'center',
                }}
              >
                {product.stock === 0 ? (
                  <Badge
                    variant="gradient"
                    gradient={{ from: 'orange', to: 'red' }}
                  >
                    {product.stock === 0
                      ? 'Out of stock'
                      : `${product.stock} in stock`}
                  </Badge>
                ) : (
                  <Badge variant="gradient">{product.stock} in stock</Badge>
                )}
              </Group>
              <Group
                mt="xl"
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  placeItems: 'center',
                  textAlign: 'center',
                }}
              >
                {product.categories.length > 0 ? (
                  <Badge size="md">
                    {product.categories
                      .map((category) => category.title)
                      .join(' | ')}
                  </Badge>
                ) : (
                  <Badge size="md">Uncategorized</Badge>
                )}
              </Group>
              <Group
                mt="md"
                mb="xl"
                style={{ display: 'flex', justifyContent: 'space-between' }}
              >
                <Title
                  order={2}
                  data-cy="product-title"
                  color={
                    theme.colorScheme === 'dark'
                      ? theme.colors.gray[5]
                      : theme.colors.dark[8]
                  }
                >
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
            </Box>
          </Link>
        </Card.Section>
        <Group position="left" mt="md" mb="xs">
          <Title
            style={{ marginRight: 'auto', marginTop: '.6rem' }}
            order={2}
            align="left"
            data-cy="product-price"
            color={
              theme.colorScheme === 'dark'
                ? theme.colors.gray[5]
                : theme.colors.dark[8]
            }
          >
            {product.price} €
          </Title>
          <Box sx={{ display: 'flex' }}>
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
              ml={14}
              className={theme.colorScheme === 'dark' ? 'buttonGlow' : ''}
              onClick={() => {
                increaseCartQuantity(product._id);
              }}
              data-cy="product-buy-button"
            >
              Add to cart
            </Button>
          </Box>
        </Group>
      </Card>
    </>
  );
}

export default ProductCard;
