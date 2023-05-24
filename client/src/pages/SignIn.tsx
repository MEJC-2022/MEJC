import { Center, Title, useMantineTheme } from '@mantine/core';
import SignInForm from '../components/SignInForm';
import { formStyle } from '../css/formStyle';

export function SignIn() {
  const theme = useMantineTheme();
  const { classes } = formStyle();

  return (
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
  );
}
