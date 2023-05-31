import { Container, Text, createStyles, useMantineTheme } from '@mantine/core';

const useStyles = createStyles((theme) => ({
  container: {
    width: '100%',
    paddingBottom: '0.8rem',
  },
  middleTextStyling: {
    textTransform: 'capitalize',
    fontSize: 40,
    wordSpacing: '2px',
    [theme.fn.smallerThan('sm')]: {
      fontSize: 20,
    },
  },
  textSpacing: {
    margin: '0 10px',
  },
}));

export function TextBanner() {
  const { classes } = useStyles();
  const theme = useMantineTheme();
  
  return (
    <Container className={classes.container}>
      <Text align="center" color={theme.colorScheme === 'dark' ? theme.colors.gray[7] : theme.colors.dark[8]} fw={600} className={classes.middleTextStyling}>
        <span className={classes.textSpacing}>
          <span className={theme.colorScheme === 'dark' ? 'blueNeonText' : ''}>We</span> bring
        </span>{' '}
        <span className={classes.textSpacing}>
          the <span className={theme.colorScheme === 'dark' ? 'pinkNeonText' : ''}>Tech</span>
        </span>{' '}
        <span className={classes.textSpacing}>
          home to <span className={theme.colorScheme === 'dark' ? 'blueNeonText' : ''}>You</span>
        </span>
      </Text>
    </Container>
  );
}
