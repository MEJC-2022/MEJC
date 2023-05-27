import {
  Accordion,
  Card,
  Divider,
  Flex,
  Loader,
  Progress,
  Table,
  Text,
  createStyles,
  rem,
  useMantineTheme,
} from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { IconAt, IconCheck, IconPhone } from '@tabler/icons-react';

const useStyles = createStyles((theme) => ({
  item: {
    borderRadius: theme.radius.md,
    marginBottom: theme.spacing.lg,
    backgroundColor:
      theme.colorScheme === 'dark' ? theme.colors.gray[8] : theme.white,
    border: `${rem(1)} solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,
  },
  panel: {
    backgroundColor:
      theme.colorScheme === 'dark'
        ? theme.colors.gray[7]
        : theme.colors.gray[1],
  },
  controlText: {
    display: 'block',
    [theme.fn.smallerThan('sm')]: {
      display: 'none',
    },
  },
  statusBar: {
    flex: 3,
    [theme.fn.smallerThan('sm')]: {
      flex: 1,
      justifyContent: 'flex-end',
    },
    alignItems: 'center',
  },
}));

export interface Order {
  _id: string;
  userId: string;
  deliveryAddress: {
    firstName: string;
    lastName: string;
    email: string;
    street: string;
    city: string;
    zipCode: number;
    phoneNumber: number;
  };
  orderItems: {
    _id: string;
    quantity: number;
  }[];
  isShipped: boolean;
  totalPrice: number;
  createdAt: string;
}

export function UserOrderAccordion({ order }: { order: Order }) {
  const { classes } = useStyles();
  const theme = useMantineTheme();
  const isSmallScreen = useMediaQuery('(max-width: 767px)');

  return (
    <Accordion.Item className={classes.item} key={order._id} value={order._id}>
      <Accordion.Control>
        <Flex justify="space-between">
          <Flex sx={{ flex: 2, [theme.fn.smallerThan('sm')]: { flex: 3 } }}>
            <Text size="md" weight={700}>
              #{order._id}
            </Text>
          </Flex>

          <Flex
            sx={{
              flex: 2,
              [theme.fn.smallerThan('sm')]: {
                flex: 3,
                justifyContent: 'center',
              },
            }}
          >
            <Text size="md" weight={500}>
              {order.createdAt}
            </Text>
          </Flex>

          <Flex className={classes.statusBar}>
            {isSmallScreen ? (
              order.isShipped ? (
                <IconCheck size={25} color={theme.colors.green[6]} />
              ) : (
                <Loader color="yellow" size="sm" />
              )
            ) : order.isShipped ? (
              <Progress
                value={100}
                color={theme.colors.green[6]}
                style={{ width: '100%' }}
                label="Shipped"
                size="xl"
              />
            ) : (
              <Progress
                value={70}
                color={theme.colors.yellow[6]}
                animate
                style={{ width: '100%' }}
                label="Processing.."
                size="xl"
              />
            )}
          </Flex>

          <Flex
            sx={{ flex: 1, justifyContent: 'flex-end' }}
            className={classes.controlText}
          >
            <Text size="md" weight={500}>
              Details
            </Text>
          </Flex>
        </Flex>
      </Accordion.Control>

      <Accordion.Panel className={classes.panel}>
        <Flex direction={{ base: 'column', md: 'row' }}>
          <Flex direction="column" style={{ flex: 2, marginRight: '2rem' }}>
            <Table verticalSpacing="xs">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Quantity</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody>
                {order.orderItems.map((item) => (
                  <tr key={item._id}>
                    <td>{item._id}</td>
                    <td>{item.quantity}</td>
                    <td>€10 </td>
                  </tr>
                ))}
              </tbody>
            </Table>
            <Flex
              justify="flex-end"
              align="flex-end"
              style={{ height: '100%' }}
            >
              <Text>Total price: €{order.totalPrice}</Text>
            </Flex>
          </Flex>
          <Flex direction="column" style={{ flex: 1 }}>
            <Card shadow="xs" padding="md">
              <Flex
                direction="column"
                align={{ base: 'center', md: 'flex-start' }}
              >
                <Text>
                  {order.deliveryAddress.firstName}{' '}
                  {order.deliveryAddress.lastName}
                </Text>
                <Text>{order.deliveryAddress.street}</Text>
                <Text>
                  {order.deliveryAddress.zipCode}, {order.deliveryAddress.city}
                </Text>
                <Text>
                  <Divider variant="dashed" my="md" />
                  <IconAt size={18} /> {order.deliveryAddress.email}
                </Text>
                <Text>
                  <IconPhone size={18} /> {order.deliveryAddress.phoneNumber}
                </Text>
              </Flex>
              <Flex direction="column"></Flex>
            </Card>
          </Flex>
        </Flex>
      </Accordion.Panel>
    </Accordion.Item>
  );
}
