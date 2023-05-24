import {
  Button,
  Center,
  Group,
  Title,
  createStyles,
  rem,
  useMantineTheme,
} from '@mantine/core';
import { SignInForm } from '../components/SignInForm';
import { useAuth } from '../contexts/AuthContext';

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
  control: {
    backgroundColor: theme.colors[theme.primaryColor][7],
  },
  title: {
    fontSize: rem(50),
    color: theme.colorScheme === 'dark' ? theme.colors.blue[5] : theme.white,
    lineHeight: 1,
    marginBottom: `calc(${theme.spacing.xl} * 1.5)`,
  },
}));

export default function SignIn() {
  const { classes } = useStyles();
  const theme = useMantineTheme();

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
