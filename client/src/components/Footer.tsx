import {
  ActionIcon,
  Anchor,
  Box,
  Button,
  Container,
  Group,
  Image,
  Text,
  TextInput,
  Title,
  createStyles,
  rem,
  useMantineTheme,
} from '@mantine/core';
import { useForm, yupResolver } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import {
  IconBrandInstagram,
  IconBrandTwitter,
  IconBrandYoutube,
  IconCheck,
} from '@tabler/icons-react';
import * as yup from 'yup';

const useStyles = createStyles((theme) => ({
  footer: {
    borderTop: `${rem(1)} solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[2]
    }`,
    height: '10rem',
  },

  actionIcon: {
    background:
      theme.colorScheme === 'dark'
        ? theme.colors.dark[6]
        : theme.colors.gray[0],

    '&:hover': {
      background:
        theme.colorScheme === 'dark'
          ? theme.colors.dark[8]
          : theme.colors.gray[2],
    },
  },

  inner: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: `${theme.spacing.md} ${theme.spacing.md}`,

    [theme.fn.smallerThan('md')]: {
      flexDirection: 'column',
    },
  },

  links: {
    justifyContent: 'center',
    [theme.fn.smallerThan('md')]: {
      marginTop: theme.spacing.lg,
      marginBottom: theme.spacing.sm,
    },
  },

  form: {
    display: 'flex',
    alignItems: 'flexStart',
    [theme.fn.smallerThan('md')]: {
      marginTop: theme.spacing.lg,
      flexDirection: 'column',
      alignItems: 'stretch',
    },
  },

  input: {
    marginRight: theme.spacing.md,
    width: '20rem',
    [theme.fn.smallerThan('md')]: {
      marginRight: 0,
      marginBottom: theme.spacing.md,
    },
  },
  responsiveImg: {
    margin: '10px 80px',
    filter:
      'brightness(0) saturate(100%) invert(52%) sepia(96%) saturate(5788%) hue-rotate(206deg) brightness(88%) contrast(98%)',
    [theme.fn.smallerThan('sm')]: {
      margin: '10px 40px',
    },
  },
}));

const schema = yup.object().shape({
  email: yup
    .string()
    .email('Invalid email')
    .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Invalid email')
    .required('Email is required'),
});

const images = [
  {
    fileName: 'recycling',
    textAbove: 'Recyclable',
    textBelow: 'Parts',
  },
  {
    fileName: 'sustainability',
    textAbove: 'Sustainable',
    textBelow: 'Transport',
  },
  {
    fileName: 'eustars',
    textAbove: 'Free Shipping',
    textBelow: 'Within EU',
  },
  {
    fileName: 'wallet',
    textAbove: 'Price',
    textBelow: 'Guarantee',
  },
  {
    fileName: 'return',
    textAbove: 'Free Returns',
    textBelow: 'Within 30 Days',
  },
];

interface FooterCenteredProps {
  links: { link: string; label: string }[];
}

export function FooterCentered({ links }: FooterCenteredProps) {
  const { classes } = useStyles();
  const theme = useMantineTheme();
  const items = links.map((link) => (
    <Anchor<'a'>
      color="gray"
      key={link.label}
      href={link.link}
      sx={{ lineHeight: 1 }}
      onClick={(event) => event.preventDefault()}
      size="sm"
    >
      {link.label}
    </Anchor>
  ));

  const form = useForm({
    validate: yupResolver(schema),
    initialValues: {
      email: '',
    },
  });

  interface FormValues {
    email: string;
  }

  const handleSubmit = async (values: FormValues) => {
    notifications.show({
      icon: <IconCheck />,
      title: 'Success',
      message: `You have successfully subscribed to our newsletter!`,
      color: 'green',
      autoClose: 3000,
      withCloseButton: false,
    });
    form.reset();
  };

  return (
    <footer className={classes.footer}>
      <div className={classes.inner}>
        <Group miw={'16rem'} className={classes.links}>
          {items}
        </Group>
        <Box>
          <Title order={3} align="center" mb="md">
            Subscribe to our newsletter!
          </Title>
          <form className={classes.form} onSubmit={form.onSubmit(handleSubmit)}>
            <TextInput
              className={classes.input}
              placeholder="Enter your email"
              {...form.getInputProps('email')}
            />
            <Button type="submit" variant="outline">
              Subscribe
            </Button>
          </form>
        </Box>

        <Group
          miw={'16rem'}
          noWrap
          my={30}
          sx={{ display: 'flex', justifyContent: 'center' }}
        >
          <ActionIcon
            size="lg"
            variant="outline"
            radius="xl"
            className={classes.actionIcon}
          >
            <IconBrandInstagram size={24} stroke="1.4" />
          </ActionIcon>
          <ActionIcon
            size="lg"
            variant="outline"
            radius="xl"
            className={classes.actionIcon}
          >
            <IconBrandTwitter size={24} stroke="1.4" />
          </ActionIcon>
          <ActionIcon
            size="lg"
            variant="outline"
            radius="xl"
            className={classes.actionIcon}
          >
            <IconBrandYoutube size={24} stroke="1.4" />
          </ActionIcon>
        </Group>
      </div>
      <Container size="xl">
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            flexWrap: 'wrap',
            margin: '50px 0px 20px 0px',
          }}
        >
          {images.map(({ fileName, textAbove, textBelow }) => (
            <div
              key={fileName}
              style={{
                marginBottom: '40px',
                textAlign: 'center',
              }}
            >
              <Text size={14} align="center" fw={900}>
                {textAbove}
              </Text>
              <Image
                src={`assets/${fileName}.svg`}
                alt={`Image ${fileName}`}
                width="80px"
                height="80px"
                className={classes.responsiveImg}
              />
              <Text size={14} align="center" fw={900}>
                {textBelow}
              </Text>
            </div>
          ))}
        </div>
      </Container>
    </footer>
  );
}
