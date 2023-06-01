import {
  Button,
  Container,
  Group,
  SimpleGrid,
  Text,
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
  const { loading, products, deleteProduct, fetchProducts } =
    useContext(ProductContext);
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
          paddingTop: `calc(${theme.spacing.xl} * 4)`,
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
      {loading ? (
        <Text align="center">Loading...</Text>
      ) : (
        <>
          {products.length === 0 ? (
            <Text align="center">
              No products found. Please add a new product.
            </Text>
          ) : (
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
              {[...products].reverse().map((product) => (
                <AdminProductCard
                  key={product._id}
                  product={product}
                  onDelete={() => deleteProduct(product._id)}
                />
              ))}
            </SimpleGrid>
          )}
        </>
      )}
    </Container>
  );
}

export default AdminProducts;
