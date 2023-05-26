import {
  Accordion,
  Box,
  Title,
  createStyles,
  rem,
  useMantineTheme,
} from '@mantine/core';
import { Order, UserOrderAccordion } from '../components/UserOrderAcc';
import { mockOrders } from './mockOrder';

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
        : theme.colors.gray[7],
    lineHeight: 1,
    marginBottom: `calc(${theme.spacing.xl} * 1.5)`,
  },
  accordion: {
    width: '100%',
    maxWidth: '1250px',
  },
}));

export default function UserOrders() {
  const { classes } = useStyles();
  const theme = useMantineTheme();

  const orders = mockOrders;

  return (
    <Box className={classes.wrapper}>
      <Title
        className={`${classes.title} ${
          theme.colorScheme === 'dark' ? 'neonText' : ''
        }`}
      >
        Order history
      </Title>
      <Accordion transitionDuration={600} className={classes.accordion}>
        {orders.map((order: Order) => (
          <UserOrderAccordion order={order} key={order._id} />
        ))}
      </Accordion>
    </Box>
  );
}
