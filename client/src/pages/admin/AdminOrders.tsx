import { Accordion, Container, Title, createStyles, useMantineTheme } from '@mantine/core';
import { AdminOrderAccordion } from '../../components/AdminOrderAcc';
import { Order } from '../../components/UserOrderAcc';
import { mockOrders } from '../mockOrder';

const useStyles = createStyles((theme) => ({
  accordion: {
    width: '100%',
    maxWidth: '1250px',
  },
}));

export default function AdminOrders() {
  const { classes } = useStyles();
  const theme = useMantineTheme();

  const orders = mockOrders;
  
  return (
    <Container>
      <Title mb="lg" ta="center">
        Admin - Order Management
      </Title>
      <Accordion transitionDuration={600} className={classes.accordion}>
        {orders.map((order: Order) => (
          <AdminOrderAccordion order={order} key={order._id} />
        ))}
      </Accordion>
    </Container>
  );
}
