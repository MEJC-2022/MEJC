import {
  Accordion,
  Box,
  Container,
  createStyles,
  rem,
  Title,
  Text,
  useMantineTheme,
} from '@mantine/core';
import { IconMessages } from '@tabler/icons-react';
import '../css/GradientText.css';

const useStyles = createStyles((theme) => ({
  wrapper: {
    boxSizing: 'border-box',
    backgroundImage:
      theme.colorScheme === 'dark'
        ? `linear-gradient(-60deg, ${theme.colors.gray[8]} 0%, ${theme.colors.gray[9]} 100%)`
        : `linear-gradient(-60deg, ${theme.colors.blue[3]} 0%, ${theme.colors.blue[7]} 100%)`,
    padding: `calc(${theme.spacing.xl} * 4)`,
    minHeight: 'calc(100vh - 4.375rem - 10rem)',

    [theme.fn.smallerThan('sm')]: {
      minHeight: 'calc(100vh - 4.375rem - 19.8rem)',
      padding: `calc(${theme.spacing.xl} * 3)`,
    },
  },

  title: {
    marginBottom: `calc(${theme.spacing.xl} * 1.5)`,
    fontSize: rem(220),
    fontWeight: 900,
    lineHeight: 1,
    [theme.fn.smallerThan('sm')]: {
      fontSize: rem(80),
    },
  },
  titleColor: {
    color: theme.colors.gray[1],
  },
  secondTitle: {
    textAlign: 'center',
    fontWeight: 900,
    fontSize: rem(38),
    marginBottom: rem(30),
    color:
      theme.colorScheme === 'dark'
        ? theme.colors.gray[5]
        : theme.colors.gray[1],
    [theme.fn.smallerThan('sm')]: {
      fontSize: rem(30),
    },
  },
  icon: {
    color:
      theme.colorScheme === 'dark'
        ? theme.colors.gray[5]
        : theme.colors.gray[1],
    [theme.fn.smallerThan('sm')]: {
      fontSize: rem(30),
    },
  },

  item: {
    borderRadius: theme.radius.md,
    marginBottom: theme.spacing.lg,
    border: `${rem(1)} solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,
  },
}));

export function Faq() {
  const { classes } = useStyles();
  const theme = useMantineTheme();
  return (
    <Box className={classes.wrapper}>
      <Container size="sm">
        <Title
          align="center"
          className={`${classes.title} ${
            theme.colorScheme === 'dark' ? 'gradientText' : classes.titleColor
          }`}
        >
          FAQ
        </Title>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            marginBottom: '1.2rem',
          }}
        >
          <IconMessages className={classes.icon} size={80} stroke="0.04rem" />
        </Box>
        <Title className={classes.secondTitle}>
          Frequently Asked Questions
        </Title>

        <Accordion variant="separated">
          <Accordion.Item className={classes.item} value="best-laptop">
            <Accordion.Control>
              Are the retro laptops and computer accessories in your webshop new
              or used?
            </Accordion.Control>
            <Accordion.Panel>
              We offer a combination of new old stock (NOS) and refurbished
              retro computer products. NOS items are unused, old inventory that
              has been stored and preserved in their original packaging.
              Refurbished items are carefully restored to a fully functional and
              presentable condition.
            </Accordion.Panel>
          </Accordion.Item>

          <Accordion.Item className={classes.item} value="ssd-or-hdd">
            <Accordion.Control>
              Can I use retro computer products for modern tasks?
            </Accordion.Control>
            <Accordion.Panel>
              While retro computer products are primarily meant for collectors
              and nostalgia enthusiasts, many of them can still perform basic
              tasks such as word processing, web browsing, and running older
              software. However, they may not be suitable for resource-intensive
              modern applications or games.
            </Accordion.Panel>
          </Accordion.Item>

          <Accordion.Item className={classes.item} value="ram">
            <Accordion.Control>
              Are the retro laptops and accessories in working condition?
            </Accordion.Control>
            <Accordion.Panel>
              Yes, all the retro laptops and accessories we sell are thoroughly
              tested to ensure they are in working order. Any defects or issues
              are clearly mentioned in the product descriptions.
            </Accordion.Panel>
          </Accordion.Item>

          <Accordion.Item className={classes.item} value="battery-life">
            <Accordion.Control>
              Can I return or exchange a retro computer product if I'm not
              satisfied?
            </Accordion.Control>
            <Accordion.Panel>
              We accept returns and exchanges within 30 days from the date of
              purchase. However, please note that the products must be in the
              same condition as when they were shipped and should be returned in
              their original packaging. Refer to our Returns and Exchanges
              policy for more details.
            </Accordion.Panel>
          </Accordion.Item>

          <Accordion.Item className={classes.item} value="warranty">
            <Accordion.Control>
              What payment methods do you accept?
            </Accordion.Control>
            <Accordion.Panel>
              We accept various payment methods, including credit/debit cards
              (Visa, Mastercard, American Express), PayPal, and other popular
              online payment platforms. You can choose the preferred payment
              method during the checkout process.
            </Accordion.Panel>
          </Accordion.Item>
          <Accordion.Item className={classes.item} value="warranty">
            <Accordion.Control>
              Can I sell my retro computer products through your webshop?
            </Accordion.Control>
            <Accordion.Panel>
              Currently, we only sell products that are sourced and curated by
              our team. We do not offer a platform for individuals to sell their
              own retro computer products.
            </Accordion.Panel>
          </Accordion.Item>
        </Accordion>
        <Text align="center" color="#EEEEEE">
          If you have any additional questions or need further assistance,
          please don't hesitate to contact our customer support. We're here to
          help!
        </Text>
      </Container>
    </Box>
  );
}
