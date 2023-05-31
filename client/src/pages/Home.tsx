import {
  Badge,
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
import { SVGBanner } from '../components/SVGBanner';
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
    <>
      <HeroSlide />
      <SVGBanner />
      <Container size="xl" py={'3rem'}>
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
        <Title
          sx={{ marginBottom: '1rem' }}
          ta="center"
          className={theme.colorScheme === 'dark' ? 'neonText' : ''}
        >
          Browse our collection
        </Title>
        <Badge sx={{ marginBottom: '1rem' }} size="lg" radius="sm">
          Sort By Category:
        </Badge>
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
              border:
                activeButton === 'Apple' ? '2px solid lightblue ' : 'none',
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
          <Button
            size="xs"
            variant="outlined"
            radius="sm"
            onClick={resetFilter}
          >
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
    </>
  );
}

export default Home;
