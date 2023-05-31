import { Container, Text, createStyles } from '@mantine/core';

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
  return (
    <Container className={classes.container}>
      <Text align="center" fw={600} className={classes.middleTextStyling}>
        <span className={classes.textSpacing}>
          <span>We</span> bring
        </span>{' '}
        <span className={classes.textSpacing}>
          the <span>Tech</span>
        </span>{' '}
        <span className={classes.textSpacing}>
          to <span>You</span>
        </span>
      </Text>
    </Container>
  );
}
