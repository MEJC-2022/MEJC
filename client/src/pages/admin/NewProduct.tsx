import {
  Box,
  Container,
  Group,
  Title,
  createStyles,
  rem,
  useMantineTheme,
} from '@mantine/core';
import { useContext } from 'react';
import ProductForm from '../../components/ProductForm';
import { ProductContext } from '../../contexts/ProductContext';

const useStyles = createStyles((theme) => ({
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundImage:
      theme.colorScheme === 'dark'
        ? `linear-gradient(-60deg, ${theme.colors.gray[8]} 0%, ${theme.colors.gray[9]} 100%)`
        : `linear-gradient(-60deg, ${theme.colors.gray[3]} 0%, ${theme.colors.gray[1]} 100%)`,
    padding: `calc(${theme.spacing.xl} * 5)`,
    minHeight: 'calc(100vh - 4.375rem - 10rem)',
    [theme.fn.smallerThan('sm')]: {
      padding: `calc(${theme.spacing.xl})`,
      paddingTop: '3rem',
      minHeight: 'calc(100vh - 4.375rem - 19.8rem)',
    },
  },
  title: {
    fontSize: rem(50),
    [theme.fn.smallerThan('sm')]: {
      fontSize: rem(40),
    },
    color:
      theme.colorScheme === 'dark'
        ? theme.colors.blue[5]
        : theme.colors.gray[8],
    lineHeight: 1,
    marginBottom: `calc(${theme.spacing.xl} * 1.5)`,
  },
}));

function NewProduct() {
  const { addProduct } = useContext(ProductContext);
  const { classes } = useStyles();

  return (
    <Box className={classes.wrapper}>
      <Container>
        <Group position="center" mb="xl">
          <Title ta="center" className={classes.title}>
            Add New Product
          </Title>
        </Group>
        <ProductForm
          onSubmit={addProduct}
          addProduct={addProduct}
          isEditing={false}
        />
      </Container>
    </Box>
  );
}

export default NewProduct;
