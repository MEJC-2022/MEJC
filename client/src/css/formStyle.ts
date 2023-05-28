import { createStyles, rem, useMantineTheme } from '@mantine/core';

export const formStyle = createStyles((theme) => ({
  wrapper: {
    margin: '0rem 0rem 0rem 0rem',
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
  form: {
    backgroundColor:
      theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.white,
    padding: theme.spacing.xl,
    borderRadius: theme.radius.md,
    boxShadow: theme.shadows.lg,
    width: '100%',
    minWidth: '290px',
    border: theme.colorScheme === 'light' ? '1px #EEEEEE solid' : 'none',
  },
  input: {
    backgroundColor:
      theme.colorScheme === 'dark' ? theme.colors.gray[8] : theme.white,
    borderColor: theme.colors.gray[4],
    color: theme.black,
    '&::placeholder': {
      color: theme.colors.gray[5],
    },
  },
  inputLabel: {
    color: theme.colorScheme === 'dark' ? theme.colors.gray[3] : theme.black,
  },
  control: {
    //backgroundColor: theme.colors[theme.primaryColor][7],
  },
  anchor: {
    color:
      theme.colorScheme === 'dark'
        ? theme.colors.dark[0]
        : theme.colors.gray[9],
  },
  lighterText: {
    color:
      theme.colorScheme === 'dark'
        ? theme.colors.dark[2]
        : theme.colors.gray[8],
  },
  title: {
    fontSize: rem(50),
    color: theme.colorScheme === 'dark' ? theme.colors.blue[5] : theme.white,
    lineHeight: 1,
    marginBottom: `calc(${theme.spacing.xl} * 1.5)`,
  },
}));
