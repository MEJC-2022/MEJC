import {
  ActionIcon,
  Box,
  Button,
  Center,
  Container,
  createStyles,
  Group,
  rem,
  SimpleGrid,
  Text,
  Textarea,
  TextInput,
  Title,
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
import * as Yup from 'yup';

const useStyles = createStyles((theme) => ({
  wrapper: {
    boxSizing: 'border-box',
    backgroundImage:
      theme.colorScheme === 'dark'
        ? `linear-gradient(-60deg, ${theme.colors.gray[8]} 0%, ${theme.colors.gray[9]} 100%)`
        : `linear-gradient(-60deg, ${theme.colors.blue[3]} 0%, ${theme.colors.blue[7]} 100%)`,
    padding: `calc(${theme.spacing.xl} * 5)`,
    minHeight: 'calc(100vh - 4.375rem - 13rem)',

    [theme.fn.smallerThan('sm')]: {
      minHeight: 'calc(100vh - 4.375rem - 23.8rem)',
      padding: `calc(${theme.spacing.xl} * 2)`,
    },
  },

  title: {
    marginBottom: `calc(${theme.spacing.xl} * 1.5)`,
    fontSize: rem(180),
    fontWeight: 900,
    lineHeight: 1,
    paddingBottom: rem(40),
    color: theme.colorScheme === 'dark' ? theme.colors.blue[5] : theme.white,
    [theme.fn.smallerThan('md')]: {
      fontSize: rem(80),
    },
    [theme.fn.smallerThan('sm')]: {
      paddingBottom: rem(20),
      fontSize: rem(60),
    },
  },
  secondTitle: {
    color:
      theme.colorScheme === 'dark'
        ? theme.colors.gray[5]
        : theme.colors.gray[1],
  },

  titleColor: {
    color:
      theme.colorScheme === 'dark'
        ? theme.colors.gray[5]
        : theme.colors.gray[1],
  },

  description: {
    color: theme.colors[theme.primaryColor][0],
    maxWidth: rem(300),

    [theme.fn.smallerThan('sm')]: {
      maxWidth: '100%',
    },
  },

  form: {
    backgroundColor: theme.colorScheme === 'dark' ? '#25262b' : theme.white,
    padding: theme.spacing.xl,
    borderRadius: theme.radius.md,
    boxShadow: theme.shadows.lg,
  },

  social: {
    color: theme.colorScheme === 'dark' ? theme.colors.blue[5] : theme.white,

    '&:hover': {
      color: theme.colors[theme.primaryColor][1],
    },
  },

  input: {
    backgroundColor:
      theme.colorScheme === 'dark' ? theme.colors.gray[8] : theme.white,
    borderColor: theme.colors.gray[4],
    color:
      theme.colorScheme === 'light'
        ? theme.colors.gray[8]
        : theme.colors.gray[1],
    '&::placeholder': {
      color: theme.colors.gray[5],
    },
  },

  inputLabel: {
    color: theme.colorScheme === 'dark' ? theme.colors.gray[3] : theme.black,
  },

  control: {
    backgroundColor: theme.colors[theme.primaryColor][6],
  },
}));

const social = [IconBrandTwitter, IconBrandYoutube, IconBrandInstagram];
const schema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email')
    .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Invalid email')
    .required('Email is required'),
  name: Yup.string()
    .min(2, 'Name should have at least 2 letters')
    .required('This field is required'),
  message: Yup.string()
    .min(10, 'Message should have at least 10 characters')
    .required('Message is required'),
});

export function Contact() {
  const { classes } = useStyles();
  const theme = useMantineTheme();
  const form = useForm({
    validate: yupResolver(schema),
    initialValues: {
      email: '',
      name: '',
      message: '',
    },
  });

  const icons = social.map((Icon, index) => (
    <ActionIcon
      key={index}
      size={32}
      className={classes.social}
      variant="transparent"
    >
      <Icon size={32} stroke={1.5} />
    </ActionIcon>
  ));

  const handleSubmit = () => {
    notifications.show({
      icon: <IconCheck />,
      title: 'Thank you for your message!',
      message: `We'll get back to you within 48 hours`,
      color: 'green',
      autoClose: 3000,
      withCloseButton: false,
    });
    form.reset();
  };

  return (
    <Box className={classes.wrapper}>
      <Title
        align="center"
        className={`${classes.title} ${
          theme.colorScheme === 'dark' ? 'gradientText' : classes.titleColor
        }`}
      >
        Contact
      </Title>
      <Center>
        <Container>
          <SimpleGrid
            cols={2}
            spacing={50}
            breakpoints={[{ maxWidth: 'sm', cols: 1 }]}
          >
            <div>
              <Title className={classes.secondTitle}>Need any help?</Title>
              <Text className={classes.description} mt="sm" mb={30}>
                Leave your email and we will get back to you as quicky as
                possible. Usually within 48 hours.
              </Text>

              <Group mt="xl">{icons}</Group>
            </div>
            <div className={classes.form}>
              <form onSubmit={form.onSubmit(handleSubmit)}>
                <TextInput
                  label="Email"
                  withAsterisk
                  placeholder="your@email.com"
                  {...form.getInputProps('email')}
                  classNames={{
                    input: classes.input,
                    label: classes.inputLabel,
                  }}
                />
                <TextInput
                  label="Name"
                  withAsterisk
                  placeholder="Your name here"
                  mt="md"
                  {...form.getInputProps('name')}
                  classNames={{
                    input: classes.input,
                    label: classes.inputLabel,
                  }}
                />
                <Textarea
                  label="Message"
                  withAsterisk
                  placeholder="You can type your question here..."
                  minRows={4}
                  mt="md"
                  {...form.getInputProps('message')}
                  classNames={{
                    input: classes.input,
                    label: classes.inputLabel,
                  }}
                />
                <Group position="right" mt="md">
                  <Button type="submit" className={classes.control}>
                    Send message
                  </Button>
                </Group>
              </form>
            </div>
          </SimpleGrid>
        </Container>
      </Center>
    </Box>
  );
}
