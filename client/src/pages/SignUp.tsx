import {
  Box,
  Button,
  Center,
  Group,
  Loader,
  Text,
  TextInput,
  Title,
  useMantineTheme,
} from '@mantine/core';
import { useForm, yupResolver } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { IconCheck } from '@tabler/icons-react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { useAuth } from '../contexts/AuthContext';
import { formStyle } from '../css/formStyle';

const schema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email')
    .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Invalid email')
    .required('Email is required'),
  password: Yup.string()
    .min(10, 'Password must be at least 8 characters')
    .required('Password is required'),
  passwordConfirmation: Yup.string()
    .oneOf([Yup.ref('password', undefined)], 'Passwords must match')
    .required('Password confirmation is required'),
});

interface FormValues {
  email: string;
  password: string;
  passwordConfirmation: string;
}

export default function SignIn() {
  const theme = useMantineTheme();
  const { classes } = formStyle();

  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { setUser } = useAuth();

  const form = useForm({
    validate: yupResolver(schema),
    initialValues: {
      email: '',
      password: '',
      passwordConfirmation: '',
    },
  });

  const handleSubmit = async (values: FormValues) => {
    try {
      const { email, password } = values;
      setIsLoading(true);
      const response = await fetch('/api/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
        credentials: 'include',
      });

      if (response.ok) {
        const response = await fetch('/api/users/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
          credentials: 'include',
        });
        if (response.ok) {
          const { session: user } = await response.json();
          setUser(user);
          notifications.show({
            icon: <IconCheck />,
            title: 'You have successfully created an account',
            message: `Welcome! Let's get shopping!`,
            color: 'green',
            autoClose: 3000,
            withCloseButton: false,
          });
          navigate('/');
        }
      } else {
        const errorMessage = await response.json();
        if (response.status === 404) {
          form.setErrors({ email: errorMessage });
        }
      }
    } catch (err) {
      console.error('An error has occured trying to create an user:\n', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Center className={classes.wrapper}>
      <Title
        className={`${classes.title} ${
          theme.colorScheme === 'dark' ? 'neonText' : ''
        }`}
      >
        Sign up
      </Title>
      <Box maw={600} className={classes.form}>
        <form onSubmit={form.onSubmit(handleSubmit)} autoComplete="off">
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
          <TextInput
            type="password"
            mt="md"
            label="Confirm password"
            placeholder="********"
            {...form.getInputProps('passwordConfirmation')}
            classNames={{ input: classes.input, label: classes.inputLabel }}
          />
          <Group position="right" mt="md">
            <Button
              type="submit"
              variant="light"
              className={theme.colorScheme === 'dark' ? 'buttonGlow' : ''}
              disabled={isLoading}
            >
              {isLoading ? (
                <Loader size="sm" color="black" />
              ) : (
                'Create account'
              )}
            </Button>
          </Group>
        </form>
      </Box>
      <Text fz="md" mt={20} className={classes.lighterText}>
        Already have an account?{' '}
        <Link to="/signin" className={classes.anchor}>
          Sign in!
        </Link>
      </Text>
    </Center>
  );
}
