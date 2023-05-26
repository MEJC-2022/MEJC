import { Center, Title, useMantineTheme } from '@mantine/core';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SignInForm from '../components/SignInForm';
import { useAuth } from '../contexts/AuthContext';
import { formStyle } from '../css/formStyle';

export function SignIn() {
  const theme = useMantineTheme();
  const { classes } = formStyle();
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate(-1);
    }
  }, [user, navigate]);

  return !user ? (
    <Center className={classes.wrapper}>
      <Title
        className={`${classes.title} ${
          theme.colorScheme === 'dark' ? 'neonText' : ''
        }`}
      >
        Sign in
      </Title>
      <SignInForm />
    </Center>
  ) : (
    <div>It looks like you are already logged in. Redirecting...</div>
  );
}
