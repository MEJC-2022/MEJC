import {
  Button,
  Container,
  Group,
  SimpleGrid,
  Title,
  rem,
  useMantineTheme,
} from '@mantine/core';
import { IconShieldPlus } from '@tabler/icons-react';
import { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AdminProductCard from '../../components/AdminProductCard';
import { ProductContext } from '../../contexts/ProductContext';

function AdminProducts() {
  const { products, deleteProduct, fetchProducts } = useContext(ProductContext);
  const theme = useMantineTheme();

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <Container size="xl">
      <Title
        mb="xl"
        ta="center"
        className={theme.colorScheme === 'dark' ? 'neonText' : ''}
        sx={{
          marginTop: '7.2rem',
          fontSize: '3rem',
          [theme.fn.smallerThan('sm')]: {
            fontSize: rem(40),
            marginTop: '3rem',
          },
          color:
            theme.colorScheme === 'dark'
              ? theme.colors.blue[5]
              : theme.colors.gray[8],
        }}
      >
        Admin - Product Management
      </Title>
      <Group position="center" mb="xl">
        <Link to="/admin/product/new" data-cy="admin-add-product">
          <Button leftIcon={<IconShieldPlus size="1.2rem" />}>
            {' '}
            Add new Product
          </Button>
        </Link>
      </Group>
      <SimpleGrid
        sx={{ marginTop: '5rem', marginBottom: '3rem' }}
        cols={3}
        spacing="xl"
        verticalSpacing="xl"
        breakpoints={[
          { maxWidth: '85rem', cols: 2, spacing: 'md' },
          { maxWidth: '54rem', cols: 1, spacing: 'sm' },
        ]}
      >
        {products.map((product) => (
          <AdminProductCard
            key={product._id}
            product={product}
            onDelete={() => deleteProduct(product._id)}
          />
        ))}
      </SimpleGrid>
    </Container>
  );
}

export default AdminProducts;
