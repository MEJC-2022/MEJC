import {
  Accordion,
  Box,
  Container,
  Title,
  createStyles,
  rem,
} from '@mantine/core';
import { mockOrders } from '../mockOrder';

const useStyles = createStyles((theme) => ({
  wrapper: {
    flexDirection: 'column',
    alignItems: 'center',
    backgroundImage:
      theme.colorScheme === 'dark'
        ? `linear-gradient(-60deg, ${theme.colors.gray[8]} 0%, ${theme.colors.gray[9]} 100%)`
        : `linear-gradient(-60deg, ${theme.colors.gray[3]} 0%, ${theme.colors.gray[1]} 100%)`,
    padding: `calc(${theme.spacing.xl} * 5)`,
    minHeight: 'calc(100vh - 4.375rem)',
    [theme.fn.smallerThan('md')]: {
      padding: `calc(${theme.spacing.xl})`,
      paddingTop: '3rem',
      minHeight: 'calc(100vh - 4.375rem)',
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
    marginBottom: '3rem',
  },
  accordion: {
    width: '100%',
    maxWidth: '1250px',
  },
}));

export default function AdminOrders() {
  const { classes } = useStyles();

  const orders = mockOrders;

  return (
    <Box className={classes.wrapper}>
      <Container>
        <Title ta="center" className={classes.title}>
          Admin - Order Management
        </Title>
        <Accordion transitionDuration={600} className={classes.accordion}>
          {/* {orders.map((order: Order) => (
            <AdminOrderAccordion order={order} key={order._id} />
          ))} */}
        </Accordion>
      </Container>
    </Box>
  );
}
