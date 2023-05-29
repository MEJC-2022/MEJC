import {
  Badge,
  Box,
  Button,
  Card,
  Group,
  Image,
  Text,
  Title,
} from '@mantine/core';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../contexts/ProductContext';

interface Props {
  product: Product;
  onDelete?: () => void;
}

function AdminProductCard({ product, onDelete }: Props) {
  const edit = '/admin/product/' + product._id + '/edit';

  const [showConfirmDelete, setShowConfirmDelete] = useState(false);

  const handleDelete = () => {
    if (showConfirmDelete) {
      onDelete?.();
    } else {
      setShowConfirmDelete(true);
    }
  };

  return (
    <>
      <Card
        shadow="xl"
        padding="md"
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
          <Image src={'/api/file/' + product.image} height={230} fit="cover" />
          <Box pl="md" pr="md">
              <Group
                mt="lg"
                pos="absolute"
                top="0%"
                right="5%"
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
                  <Badge size="md">Uncategorized
                  </Badge>
                )}
              </Group>
            <Group position="left" mt="sm" mb="sm">
              <Text
                weight={500}
                size={29}
                transform="uppercase"
                data-cy="product-title"
              >
                {product.title}
              </Text>
            </Group>
            <Group position="left" mt="sm" mb="md">
              <Text color="dimmed">Product id:</Text>
              <Text color="dimmed" data-cy="product-id">
                {product._id}
              </Text>
            </Group>
            <Text size="md" align="left">
              {product.description}
            </Text>
          </Box>
        </Card.Section>
        <Group position="left" mt="md" mb="xs">
          {showConfirmDelete ? (
            <Button
              sx={{ color: 'red', borderColor: 'red' }}
              variant="outline"
              mt="md"
              radius="md"
              onClick={handleDelete}
              data-cy="confirm-delete-button"
            >
              Are you sure?
            </Button>
          ) : (
            <Button
              sx={{ color: 'red', borderColor: 'red' }}
              variant="outline"
              mt="md"
              radius="md"
              onClick={handleDelete}
              data-cy="admin-remove-product"
            >
              Delete Product
            </Button>
          )}
          <Link to={edit} data-cy="admin-edit-product">
            <Button variant="outline" mt="md" radius="md">
              Edit product
            </Button>
          </Link>
          <Title
            order={2}
            sx={{ marginLeft: '1rem', marginTop: '.5rem' }}
            align="right"
            data-cy="product-price"
          >
            {product.price}€
          </Title>
        </Group>
      </Card>
    </>
  );
}

export default AdminProductCard;
