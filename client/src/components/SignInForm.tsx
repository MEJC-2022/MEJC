import { Box, Button, Group, Loader, Text, TextInput } from '@mantine/core';
import { useForm, yupResolver } from '@mantine/form';
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
});

interface FormValues {
  email: string;
  password: string;
}

export default function SignInForm() {
  const { classes } = formStyle();

  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { handleSignInAsUser, handleSignInAsAdmin } = useAuth();

  const form = useForm({
    validate: yupResolver(schema),
    initialValues: {
      email: '',
      password: '',
    },
  });

  const handleSubmit = async (values: FormValues) => {
    try {
      const { email, password } = values;
      setIsLoading(true);
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
        if (user.isAdmin) {
          handleSignInAsAdmin(user._id);
        } else {
          handleSignInAsUser(user._id);
        }
        const currentPage = window.location.pathname;
        if (currentPage === '/signin') {
          navigate('/');
        }
      } else {
        const errorMessage = await response.json();
        if (response.status === 404) {
          form.setErrors({ email: errorMessage });
        }
        if (response.status === 401) {
          form.setErrors({ password: errorMessage });
        }
      }
    } catch (err) {
      console.error('An error has occured trying to login:\n', err);
    } finally {
      setIsLoading(false);
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
            <Button
              type="submit"
              className={classes.control}
              disabled={isLoading}
            >
              {isLoading ? <Loader size="sm" color="black" /> : 'Sign in'}
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
