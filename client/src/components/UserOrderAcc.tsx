import { Accordion, Flex, Loader, Progress, Text, createStyles, rem, useMantineTheme } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { IconCheck } from "@tabler/icons-react";

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
          : theme.colors.blue[2],
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
    createdAt: Date;
  }

export function UserOrderAccordion({ order }: {order : Order}) {
    const { classes } = useStyles();
    const theme = useMantineTheme();
    const isSmallScreen = useMediaQuery('(max-width: 768px)');
    
    return (
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
                        size={25}
                        color={theme.colors.green[6]}
                      />
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
                  <Text>Phone number: {order.deliveryAddress.phoneNumber}</Text>
                </Flex>
              </Flex>
            </Accordion.Panel>
          </Accordion.Item>
    )
}