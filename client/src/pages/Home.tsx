import {
  Box,
  Button,
  Container,
  Group,
  SimpleGrid,
  Text,
  Title,
  useMantineTheme,
} from '@mantine/core';
import { useContext, useEffect, useState } from 'react';
import HeroSlide from '../components/HeroSlide';
import ProductCard from '../components/ProductCard';
import { ProductContext } from '../contexts/ProductContext';
import '../css/Glow.css';

function Home() {
  const theme = useMantineTheme();
  const { loading, products, fetchProducts } =
    useContext(ProductContext);
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [activeButton, setActiveButton] = useState('');

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    setFilteredProducts(products);
  }, [products]);

  function filterByCategory(categoryName: string) {
    const filtered = products.filter((product) =>
      product.categories.some((category) => category.title === categoryName),
    );
    setFilteredProducts(filtered);
    setActiveButton(categoryName);
  }

  function resetFilter() {
    setFilteredProducts(products);
    setActiveButton('');
  }

  return (
    <Container size="xl" py={'3rem'}>
      <HeroSlide />
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column',
        }}
      >
        <Title
          className={theme.colorScheme === 'dark' ? 'neonText' : ''}
          mt={40}
          mb={14}
          size={70}
        >
          Tech101
        </Title>
        <Text fz="xl" fw={500}>
          Providing up-to-date <br /> products and services
        </Text>
        <Text fz="lg" fs="italic">
          We. Tech. You.
        </Text>
      </Box>
      <Title
        sx={{ marginTop: '4rem', marginBottom: '3rem' }}
        ta="center"
        className={theme.colorScheme === 'dark' ? 'neonText' : ''}
      >
        Browse our collection
      </Title>
      <Text
        sx={{ marginBottom: '1rem', marginLeft: '0.6rem', fontSize: '0.8rem' }}
        fw={700}
        color="none"
        size="lg"
      >
        SORT BY CATEGORY:
      </Text>
      <Group spacing={5} mb="md">
        <Button
          sx={{
            border:
              activeButton === 'Laptops' ? '2px solid lightblue ' : 'none',
          }}
          size="xs"
          variant="light"
          radius="sm"
          onClick={() => filterByCategory('Laptops')}
        >
          Laptops
        </Button>
        <Button
          sx={{
            border: activeButton === 'Apple' ? '2px solid lightblue ' : 'none',
          }}
          size="xs"
          variant="light"
          radius="sm"
          onClick={() => filterByCategory('Apple')}
        >
          Apple Products
        </Button>
        <Button
          sx={{
            border: activeButton === 'Asus' ? '2px solid lightblue ' : 'none',
          }}
          size="xs"
          variant="light"
          radius="sm"
          onClick={() => filterByCategory('Asus')}
        >
          Asus Products
        </Button>
        <Button size="xs" variant="outlined" radius="sm" onClick={resetFilter}>
          Reset filter
        </Button>
      </Group>

      {loading ? (
        <Text align="center">Loading...</Text>
      ) : (
        <>
          {filteredProducts.length === 0 ? (
            <Text align="center">
              No products found. Please try a different filter.
            </Text>
          ) : (
            <SimpleGrid
              cols={3}
              spacing="xl"
              verticalSpacing="xl"
              breakpoints={[
                { maxWidth: '85rem', cols: 2, spacing: 'md' },
                { maxWidth: '54rem', cols: 1, spacing: 'sm' },
              ]}
            >
              {[...filteredProducts].reverse().map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </SimpleGrid>
          )}
        </>
      )}
    </Container>
  );
}

export default Home;
