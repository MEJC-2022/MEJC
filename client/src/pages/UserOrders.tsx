import {
  Accordion,
  Center,
  Flex,
  Loader,
  Progress,
  Text,
  Title,
  createStyles,
  rem,
  useMantineTheme,
} from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { IconCheck } from '@tabler/icons-react';
import { mockOrders } from './mockOrder';

const useStyles = createStyles((theme) => ({
  wrapper: {
    margin: '1rem 0',
    flexDirection: 'column',
    backgroundImage:
      theme.colorScheme === 'dark'
        ? `linear-gradient(-60deg, ${theme.colors.gray[8]} 0%, ${theme.colors.gray[9]} 100%)`
        : `linear-gradient(-60deg, ${theme.colors.blue[3]} 0%, ${theme.colors.blue[7]} 100%)`,
    padding: `calc(${theme.spacing.xl} * 5)`,
    [theme.fn.smallerThan('sm')]: {
      padding: `calc(${theme.spacing.xl})`,
    },
  },
  title: {
    fontSize: rem(50),
    [theme.fn.smallerThan('sm')]: {
      fontSize: rem(40),
    },
    color: theme.colorScheme === 'dark' ? theme.colors.blue[5] : theme.white,
    lineHeight: 1,
    marginBottom: `calc(${theme.spacing.xl} * 1.5)`,
  },
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
        : theme.colors.blue[2],
  },
  accordion: {
    width: '100%',
    maxWidth: '1250px',
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

interface Order {
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
  createdAt: Date;
  updatedAt: Date;
}

export default function UserOrders() {
  const { classes } = useStyles();
  const theme = useMantineTheme();
  const isSmallScreen = useMediaQuery('(max-width: 768px)');

  const orders = mockOrders;

  return (
    <Center className={classes.wrapper}>
      <Title
        className={`${classes.title} ${
          theme.colorScheme === 'dark' ? 'neonText' : ''
        }`}
      >
        Orderhistorik
      </Title>
      <Accordion className={classes.accordion}>
        {orders.map((order: Order) => (
          <Accordion.Item
            className={classes.item}
            key={order._id}
            value={order._id}
          >
            <Accordion.Control>
              <Flex justify="space-between">
                <Flex
                  sx={{ flex: 2, [theme.fn.smallerThan('sm')]: { flex: 3 } }}
                >
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
                    {order.createdAt.toISOString().substring(0, 10)}
                  </Text>
                </Flex>
                <Flex className={classes.statusBar}>
                  {isSmallScreen ? (
                    order.isShipped ? (
                      <IconCheck
                        size={30}
                        color={theme.colors.green[6]}
                      />
                    ) : (
                      <Loader color="yellow" size="sm" />
                    )
                  ) : order.isShipped ? (
                    <Progress
                      value={100}
                      color={theme.colors.green[6]}
                      animate
                      style={{ width: '100%' }}
                      label="Shipped"
                      size="xl"
                    />
                  ) : (
                    <Progress
                      value={50}
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
              <Flex direction="row">
                <Flex
                  direction="column"
                  style={{ flex: 1, marginRight: '2rem' }}
                >
                  {order.orderItems.map((item, index) => (
                    <Text key={index}>
                      Produkt: {item._id}, Antal: {item.quantity}
                    </Text>
                  ))}
                  <Text>Total price: {order.totalPrice}kr</Text>
                </Flex>
                <Flex direction="column" style={{ flex: 1 }}>
                  <Text>
                    Name: {order.deliveryAddress.firstName}{' '}
                    {order.deliveryAddress.lastName}
                  </Text>
                  <Text>Email: {order.deliveryAddress.email}</Text>
                  <Text>Street: {order.deliveryAddress.street}</Text>
                  <Text>City: {order.deliveryAddress.city}</Text>
                  <Text>Postcode: {order.deliveryAddress.zipCode}</Text>
                  <Text>Phonenumber: {order.deliveryAddress.phoneNumber}</Text>
                </Flex>
              </Flex>
            </Accordion.Panel>
          </Accordion.Item>
        ))}
      </Accordion>
    </Center>
  );
}
