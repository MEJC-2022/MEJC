import { Container, Text, createStyles, useMantineTheme } from '@mantine/core';
import { IconHome, IconTruck } from '@tabler/icons-react';

const useStyles = createStyles((theme) => ({
  container: {
    width: '100%',
    paddingBottom: '0.8rem',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  middleTextStyling: {
    fontSize: 40,
    [theme.fn.smallerThan('sm')]: {
      fontSize: 20,
    },
  },
  textSpacing: {
    margin: '0 10px',
    [theme.fn.smallerThan('sm')]: {
      margin: '0 3px',
    },
  },
  iconStyling: {
    [theme.fn.smallerThan('sm')]: {
      display: 'none',
    },
  },
}));

export function TextBanner() {
  const { classes } = useStyles();
  const theme = useMantineTheme();

  return (
    <Container className={classes.container}>
      <Text
        color={
          theme.colorScheme === 'dark'
            ? theme.colors.dark[3]
            : theme.colors.dark[8]
        }
        fw={600}
        className={classes.middleTextStyling}
      >
        <span className={classes.textSpacing}>
          <span className={theme.colorScheme === 'dark' ? 'blueNeonText' : ''}>
            We
          </span>{' '}
          Bring
        </span>
      </Text>
      <IconTruck
        size={30}
        className={classes.iconStyling}
        color={
          theme.colorScheme === 'dark'
            ? theme.colors.dark[3]
            : theme.colors.dark[8]
        }
      />
      <Text
        color={
          theme.colorScheme === 'dark'
            ? theme.colors.dark[3]
            : theme.colors.dark[8]
        }
        fw={600}
        className={classes.middleTextStyling}
      >
        <span className={classes.textSpacing}>
          The{' '}
          <span className={theme.colorScheme === 'dark' ? 'pinkNeonText' : ''}>
            Tech
          </span>
        </span>
      </Text>
      <IconHome
        size={30}
        className={classes.iconStyling}
        color={
          theme.colorScheme === 'dark'
            ? theme.colors.dark[3]
            : theme.colors.dark[8]
        }
      />
      <Text
        color={
          theme.colorScheme === 'dark'
            ? theme.colors.dark[3]
            : theme.colors.dark[8]
        }
        fw={600}
        className={classes.middleTextStyling}
      >
        <span className={classes.textSpacing}>
          Home To{' '}
          <span className={theme.colorScheme === 'dark' ? 'blueNeonText' : ''}>
            You
          </span>
        </span>
      </Text>
    </Container>
  );
}
