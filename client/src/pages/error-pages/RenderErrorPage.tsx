import {
  Box,
  Button,
  Text,
  Title,
  createStyles,
  rem,
  useMantineTheme,
} from '@mantine/core';

interface Props {
  error: Error;
  resetErrorBoundary: () => void;
  wrapperKey: boolean;
}

function RenderErrorPage({ error, resetErrorBoundary, wrapperKey }: Props) {
  const theme = useMantineTheme();

  const useStyles = createStyles((theme) => ({
    wrapper: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      backgroundImage:
        theme.colorScheme === 'dark'
          ? `linear-gradient(-60deg, ${theme.colors.gray[8]} 0%, ${theme.colors.gray[9]} 100%)`
          : `linear-gradient(-60deg, ${theme.colors.blue[3]} 0%, ${theme.colors.blue[7]} 100%)`,
      padding: `calc(${theme.spacing.xl} * 5)`,
      minHeight: wrapperKey ? '100vh' : 'calc(100vh - 4.375rem - 13rem)',

      [theme.fn.smallerThan('sm')]: {
        minHeight: wrapperKey ? '100vh' : 'calc(100vh - 4.375rem - 23.8rem)',
        padding: `calc(${theme.spacing.xl} * 2)`,
      },
    },
    title: {
      fontSize: rem(50),
      [theme.fn.smallerThan('sm')]: {
        fontSize: rem(40),
      },
      color:
        theme.colorScheme === 'dark'
          ? theme.colors.blue[5]
          : theme.colors.gray[1],
      lineHeight: 1,
      marginBottom: `calc(${theme.spacing.xl} * 1.5)`,
    },
    accordion: {
      width: '100%',
      maxWidth: '1250px',
    },
  }));

  const { classes } = useStyles();

  return (
    <Box className={classes.wrapper}>
      <Title
        className={`${classes.title} ${
          theme.colorScheme === 'dark' ? 'neonText' : ''
        }`}
      >
        Oh no, something broke!
      </Title>
      <Text mb={50} color="white">
        This shouldn't happen, but don't worry – we're on it.
      </Text>
      <Button onClick={resetErrorBoundary}>Try reloading the page</Button>
    </Box>
  );
}

export default RenderErrorPage;
