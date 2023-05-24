import {
  Accordion,
  Center,
  Flex,
  Text,
  Title,
  createStyles,
  rem,
  useMantineTheme
} from '@mantine/core';

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
      padding: `calc(${theme.spacing.xl} * 3)`,
    },
  },
  title: {
    fontSize: rem(50),
    color: theme.colorScheme === 'dark' ? theme.colors.blue[5] : theme.white,
    lineHeight: 1,
    marginBottom: `calc(${theme.spacing.xl} * 1.5)`,
  },
  item: {
    borderRadius: theme.radius.md,
    marginBottom: theme.spacing.lg,
    border: `${rem(1)} solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,
  },
}));

export default function UserOrders() {
  const { classes } = useStyles();
  const theme = useMantineTheme();

  return (
    <Center className={classes.wrapper}>
      <Title
        className={`${classes.title} ${
          theme.colorScheme === 'dark' ? 'neonText' : ''
        }`}
      >
        Order history
      </Title>
      <Accordion sx={{ width: '60%' }}>
        <Accordion.Item className={classes.item} value="test">
          <Accordion.Control>
            <Flex justify="space-between">
              <Flex sx={{ flex: 2 }}>
                <Text size="sm" weight={500}>
                  Order #12345
                </Text>
              </Flex>
              <Flex sx={{ flex: 2 }}>
                <Text size="sm" weight={500}>
                  2023-05-23
                </Text>
              </Flex>
              <Flex sx={{ flex: 3 }}>
                <Text size="sm" weight={500}>
                  Shipped
                </Text>
              </Flex>
              <Flex sx={{ flex: 1, justifyContent: 'flex-end' }}>
                <Text size="sm" weight={500}>
                  Details
                </Text>
              </Flex>
            </Flex>
          </Accordion.Control>
          <Accordion.Panel>Order Details</Accordion.Panel>
        </Accordion.Item>
      </Accordion>
    </Center>
  );
}
