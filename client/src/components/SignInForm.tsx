import {
  Box,
  Button,
  Group,
  Text,
  TextInput,
  createStyles,
} from '@mantine/core';
import { useForm, yupResolver } from '@mantine/form';
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

const useStyles = createStyles((theme) => ({
  form: {
    backgroundColor:
      theme.colorScheme === 'dark' ? theme.colors.gray[7] : theme.white,
    padding: theme.spacing.xl,
    borderRadius: theme.radius.md,
    boxShadow: theme.shadows.lg,
    width: '100%',
    minWidth: '290px',
  },
  input: {
    backgroundColor:
      theme.colorScheme === 'dark' ? theme.colors.gray[8] : theme.white,
    borderColor: theme.colors.gray[4],
    color: theme.black,
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
  anchor: {
    color:
      theme.colorScheme === 'dark'
        ? theme.colors.dark[0]
        : theme.colors.gray[9],
  },
  lighterText: {
    color:
      theme.colorScheme === 'dark'
        ? theme.colors.dark[2]
        : theme.colors.gray[8],
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

export function SignInForm() {
  const navigate = useNavigate();
  const { classes } = useStyles();
  const form = useForm({
    validate: yupResolver(schema),
    initialValues: {
      email: '',
      password: '',
    },
  });

  const handleSubmit = async (values: FormValues) => {
    const { email, password } = values
    const response = await fetch("/api/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
      credentials: "include",
    });

    if (response.ok) {
      console.log("success");
      navigate("/");
    } else {
      console.log("failure");
    }
  };

  return (
    <>
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
        <Link to="/signup" className={classes.anchor}>
          Sign up!
        </Link>
      </Text>
    </>
  );
}
