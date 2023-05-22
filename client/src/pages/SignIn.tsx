import {
  Anchor,
  Box,
  Button,
  Center,
  Group,
  Text,
  TextInput,
  Title,
  createStyles,
  rem,
} from '@mantine/core';
import { useForm, yupResolver } from '@mantine/form';
import * as Yup from 'yup';
import { useAuth } from '../contexts/AuthContext';

const useStyles = createStyles((theme) => ({
  wrapper: {
    margin: '1rem 0',
    flexDirection: 'column',
    backgroundImage: `linear-gradient(-60deg, ${theme.colors.blue[3]} 0%, ${theme.colors.blue[7]} 100%)`,
    padding: `calc(${theme.spacing.xl} * 5)`,
    [theme.fn.smallerThan('sm')]: {
      padding: `calc(${theme.spacing.xl} * 3)`,
    },
  },
  form: {
    backgroundColor: theme.white,
    padding: theme.spacing.xl,
    borderRadius: theme.radius.md,
    boxShadow: theme.shadows.lg,
    width: '100%',
  },
  input: {
    backgroundColor: theme.white,
    borderColor: theme.colors.gray[4],
    color: theme.black,
    '&::placeholder': {
      color: theme.colors.gray[5],
    },
  },
  inputLabel: {
    color: theme.black,
  },
  control: {
    backgroundColor: theme.colors[theme.primaryColor][6],
  },
  title: {
    fontSize: rem(50),
    color: theme.white,
    lineHeight: 1,
    marginBottom: `calc(${theme.spacing.xl} * 1.5)`,
  },
  anchor: {
    color: theme.white,
  },
  lighterText: {
    color: theme.colors.gray[8],
  },
}));

const schema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email')
    .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Invalid email')
    .required('Email is required'),
  password: Yup.string()
    .min(10, 'Password must be at least 8 characters')
    .required('Password is required'),
});

interface FormValues {
  email: string;
  password: string;
}

export default function SignIn() {
  const { classes } = useStyles();
  const form = useForm({
    validate: yupResolver(schema),
    initialValues: {
      email: '',
      password: '',
    },
  });

  const handleSubmit = (values: FormValues) => {
    console.log(values);
  };

  //GLÖM EJ TA BORT
  const { setIsSignedIn, setIsAdmin } = useAuth();

  const handleSignInAsUser = () => {
    setIsSignedIn(true);
    setIsAdmin(false);
  };

  const handleSignInAsAdmin = () => {
    setIsSignedIn(true);
    setIsAdmin(true);
  };
  //------

  return (
    <Center className={classes.wrapper}>
      <Title className={classes.title}>Sign in</Title>
      <Box maw={600} className={classes.form}>
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <TextInput
            label="Email"
            placeholder="your@email.com"
            {...form.getInputProps('email')}
            classNames={{ input: classes.input, label: classes.inputLabel }}
          />
          <TextInput
            type="password"
            mt="md"
            label="Password"
            placeholder="********"
            {...form.getInputProps('password')}
            classNames={{ input: classes.input, label: classes.inputLabel }}
          />
          <Group position="right" mt="md">
            <Button type="submit" className={classes.control}>
              Sign in
            </Button>
          </Group>
        </form>
      </Box>
      <Text fz="md" mt={6} className={classes.lighterText}>
        Don't have an account?{' '}
        <Anchor href="/signup" className={classes.anchor}>
          Sign up!
        </Anchor>
      </Text>
      {/* Glöm ej ta bort */}
      <Group position="center" mt="md">
          <Button type="button" onClick={handleSignInAsUser} className={classes.control}>
            Sign in as User
          </Button>
          <Button type="button" onClick={handleSignInAsAdmin} className={classes.control}>
            Sign in as Admin
          </Button>
        </Group>
        {/* ------ */}
    </Center>
  );
}
