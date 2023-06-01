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

type Category = {
  title: string;
};

function Home() {
  const theme = useMantineTheme();
  const { loading, products, fetchProducts } = useContext(ProductContext);
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [activeButton, setActiveButton] = useState('');
  const [categories, setCategories] = useState<Category[]>([]);

  async function fetchCategories() {
    try {
      const res = await fetch('/api/categories');
      const data = await res.json();
      setCategories(data);
    } catch (error) {
      console.error('Failed to fetch categories:', error);
    }
  }

  useEffect(() => {
    fetchProducts();
    fetchCategories();
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
      <Container size="xl" py={'3rem'}>
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
          <Text fz="xl" mb={10} align="center" sx={{ width: '18rem' }} fw={500}>
            Providing retro products <br />
            and first-class repairs
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
          sx={{
            marginBottom: '1rem',
            marginLeft: '0.6rem',
            fontSize: '0.8rem',
          }}
          fw={700}
          color="none"
          size="lg"
        >
          SORT BY CATEGORY:
        </Text>
        <Group spacing={5} mb="md">
          {categories.map((category) => (
            <Button
              sx={{
                border:
                  activeButton === category.title
                    ? '2px solid lightblue '
                    : 'none',
              }}
              size="xs"
              variant="light"
              radius="sm"
              onClick={() => filterByCategory(category.title)}
            >
              {category.title}
            </Button>
          ))}
          <Button
            size="xs"
            variant="outlined"
            radius="sm"
            onClick={resetFilter}
          >
            Reset filter
          </Button>
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
                cols={3}
                spacing={30}
                verticalSpacing={30}
                breakpoints={[
                  { maxWidth: '85rem', cols: 2, spacing: 'md' },
                  { maxWidth: '36rem', cols: 1, spacing: 'sm' },
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
    </>
  );
}

export default Home;
