import {
  Box,
  Button,
  Container,
  Group,
  MediaQuery,
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
  const { products, fetchProducts } = useContext(ProductContext);

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
    <Container size="xl">
      <HeroSlide />
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column',
        }}
      >
        <Title>Tech101</Title>
        <Text fz="xl" fw={500}>
          Providing up-to-date <br /> products and services
        </Text>
        <Text fz="lg" fs="italic">
          We. Tech. You
        </Text>
      </Box>
      <MediaQuery
        query="(max-width: 650px)"
        styles={{
          img: {
            width: '3.6rem',
            height: '3.6rem',
          },
        }}
      >
        <Box
          sx={{
            width: '100%',
            background:
              theme.colorScheme === 'dark'
                ? theme.colors.dark[0]
                : theme.colors.blue[0],
            display: 'flex',
            justifyContent: 'space-around',
            marginBottom: '1.5rem',
            marginTop: '1rem',
            padding: '.3rem',
            boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
          }}
        >
          <img src="/assets/recycable-parts.svg" alt="recycable parts icon" />
          <img
            src="./assets/sustainable-transports.svg"
            alt="sustainable transports icon"
          />
          <img src="/assets/free-deliveries.svg" alt="free deliveries icon" />
          <img src="/assets/price-guarantee.svg" alt="price guarantee icon" />
          <img src="/assets/free-returns.svg" alt="free returns icon" />
        </Box>
      </MediaQuery>
      <Title
        sx={{ marginBottom: '1rem' }}
        ta="center"
        className={theme.colorScheme === 'dark' ? 'neonText' : ''}
      >
        Browse our collection
      </Title>
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
          Sort by only Laptops
        </Button>
        <Button size="xs" variant="light" radius="sm" onClick={resetFilter}>
          Reset filter
        </Button>
      </Group>

      <SimpleGrid
        cols={3}
        spacing="xl"
        verticalSpacing="xl"
        breakpoints={[
          { maxWidth: '85rem', cols: 2, spacing: 'md' },
          { maxWidth: '36rem', cols: 1, spacing: 'sm' },
        ]}
      >
        {filteredProducts.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </SimpleGrid>
    </Container>
  );
}

export default Home;
