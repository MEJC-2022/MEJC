import { Box, Title, Text, createStyles, rem, useMantineTheme } from '@mantine/core';

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
    minHeight: 'calc(100vh - 4.375rem - 13rem)',

    [theme.fn.smallerThan('sm')]: {
      minHeight: 'calc(100vh - 4.375rem - 23.8rem)',
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

interface Props {
  error: Error;
  resetErrorBoundary: () => void;
}

function RenderErrorPage({ error, resetErrorBoundary }: Props) {
  const theme = useMantineTheme();
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
      <Text color="white">Don't worry, we're on it.</Text>
    </Box>
  );
}

export default RenderErrorPage;
