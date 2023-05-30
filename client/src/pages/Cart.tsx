import {
  Box,
  Button,
  Container,
  Divider,
  Flex,
  Text,
  Title,
  createStyles,
  rem,
  useMantineTheme,
} from '@mantine/core';
import { Fragment, useContext } from 'react';
import { Link } from 'react-router-dom';
import CartProduct from '../components/CartProduct';
import CheckoutForm from '../components/CheckoutForm';
import SignInForm from '../components/SignInForm';
import { useAuth } from '../contexts/AuthContext';
import { ProductContext } from '../contexts/ProductContext';
import { useShoppingCart } from '../contexts/ShoppingCartContext';

const useStyles = createStyles((theme) => ({
  title: {
    marginTop: '7rem',
    fontSize: rem(50),
    [theme.fn.smallerThan('sm')]: {
      fontSize: rem(40),
      marginTop: '2.6rem',
    },
    color:
      theme.colorScheme === 'dark'
        ? theme.colors.blue[5]
        : theme.colors.gray[8],
    lineHeight: 1,
    marginBottom: `calc(${theme.spacing.xl} * 1.5)`,
  },
  container: {},
}));

function Cart() {
  const { cartProducts, cartQuantity } = useShoppingCart();
  const { products } = useContext(ProductContext);
  const { user } = useAuth();
  const theme = useMantineTheme();
  const isLightColorScheme = theme.colorScheme === 'light';
  const borderStyle = isLightColorScheme ? '1px #EEEEEE solid' : 'none';
  const { classes } = useStyles();

  <Text weight={500} size={29}>
    total:{' '}
    {cartProducts.reduce((total, cartProduct) => {
      const product = products.find((i) => i._id === cartProduct._id);
      return total + (product?.price || 0) * cartProduct.quantity;
    }, 0)}
    €
  </Text>;

  if (cartQuantity < 1) {
    return (
      <Container
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          paddingTop: '2rem',
          paddingBottom: '2rem',
        }}
        size="xs"
      >
        <img
          src="./assets/sad-cart.svg"
          alt="a sad box indicating that the cart is empty"
        />
        <Text
          style={{
            color: '#E92D37',
            fontWeight: '500',
            fontSize: '1.5rem',
            textAlign: 'center',
          }}
        >
          Oops! Your cart is empty!
        </Text>
        <Text>Looks like you haven´t added anything to your cart yet</Text>
        <Link to="/">
          <Button variant="light" mt="md" radius="md">
            Shop Now
          </Button>
        </Link>
      </Container>
    );
  } else {
    return (
      <Container
        size={'1680px'}
        sx={{
          marginTop: '0.5rem',
          marginBottom: '4rem',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Title
          className={`${classes.title} ${
            theme.colorScheme === 'dark' ? 'neonText' : ''
          }`}
        >
          Your cart
        </Title>
        <Flex
          gap="3rem"
          wrap="wrap"
          direction="column"
          justify="center"
          align="center"
        >
          <Box className={classes.container}>
            {cartProducts.map((product) => (
              <Fragment key={product._id}>
                <CartProduct cartItem={product} />
                <Divider mt="md" mb="sm" size="xs" />
              </Fragment>
            ))}
          </Box>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'flex-start',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '3rem',
              width: '90%',
              '@media(max-width:1000px)': {
                justifyContent: 'flex-start',
                flexDirection: 'column-reverse',
              },
            }}
          >
            {user ? (
              <CheckoutForm />
            ) : (
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  width: '20.7rem',
                }}
              >
                <Title mb="lg" order={1} sx={{ alignSelf: 'flex-start' }}>
                  Sign in to continue
                </Title>
                <SignInForm />
              </Box>
            )}
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '2rem',
              }}
            >
              <Box
                sx={{
                  width: '20.7rem',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyItems: 'center',
                  alignItems: 'flex-start',
                  padding: '2rem',
                  borderRadius: theme.radius.md,
                  backgroundColor:
                    theme.colorScheme === 'dark' ? '#25262b' : '#e7f5ff',
                  '@media(max-width:721px)': {
                    width: '20rem',
                  },
                }}
              >
                <Title mb="lg" order={1} sx={{ alignSelf: 'flex-start' }}>
                  Cart summary
                </Title>
                <Text weight={500} size={20} sx={{ minWidth: '100%' }}>
                  {cartProducts.map((cartproduct) => {
                    const product = products.find(
                      (i) => i._id === cartproduct._id,
                    );
                    return (
                      <div key={cartproduct._id}>
                        <Box
                          sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            gap: '1rem',
                            justifyContent: 'space-between',
                          }}
                        >
                          <Text
                            sx={{
                              minWidth: '8rem',
                              maxWidth: '8rem',
                              fontSize: '1rem',
                            }}
                          >
                            {product?.title}
                          </Text>
                          <Text
                            sx={{ alignSelf: 'flex-end', marginLeft: 'auto' }}
                            weight={700}
                          >
                            {cartproduct.quantity} x {product?.price}€
                          </Text>
                        </Box>
                        <Divider mt="md" mb="md" size="xs" />
                      </div>
                    );
                  })}
                </Text>
                <Text
                  data-cy="total-price"
                  weight={700}
                  size={20}
                  sx={{ alignSelf: 'flex-end' }}
                >
                  Total price:{' '}
                  {cartProducts.reduce((total, cartProduct) => {
                    const product = products.find(
                      (i) => i._id === cartProduct._id,
                    );
                    return total + (product?.price || 0) * cartProduct.quantity;
                  }, 0)}
                  €
                </Text>
              </Box>
            </Box>
          </Box>
        </Flex>
      </Container>
    );
  }
}

export default Cart;
