import {
  Box,
  Button,
  Text,
  Title,
  createStyles,
  rem,
  useMantineTheme,
} from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import {
  HeaderResponsive,
  HeaderResponsiveProps,
} from '../../components/Navbar';

function UnauthorizedPage() {
  const theme = useMantineTheme();
  const navigate = useNavigate();

  const headerLinks: HeaderResponsiveProps['links'] = [
    { link: '/', label: 'Store' },
    { link: '/faq', label: 'FAQ' },
    { link: '/contact', label: 'Contact Us' },
  ];

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
      minHeight: '100vh',

      [theme.fn.smallerThan('sm')]: {
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
    headerTitle: {
      marginBottom: `calc(${theme.spacing.xl} * 1.5)`,
      fontSize: rem(220),
      fontWeight: 900,
      lineHeight: 1,
      [theme.fn.smallerThan('sm')]: {
        fontSize: rem(80),
      },
    },
    titleColor: {
      color: theme.colors.gray[1],
    },
  }));

  const { classes } = useStyles();

  return (
    <>
      <HeaderResponsive links={headerLinks} />
      <Box className={classes.wrapper}>
        <Title
          align="center"
          className={`${classes.headerTitle} ${
            theme.colorScheme === 'dark' ? 'gradientText' : classes.titleColor
          }`}
        >
          401
        </Title>
        <Title align="center" className={classes.title}>
          You're not authorized
        </Title>
        <Text align="center" mb={50} color="white">
          Nobody likes to be told what they can or can't do. But sometimes
          that's just life. If you think this is a mistake, please contact us at{' '}
          <a href="mailto:admin@tech101.com">admin@tech101.com</a> and we'll get
          it all sorted out.
        </Text>
        <Button onClick={() => navigate('/')}>Go back to home</Button>
      </Box>
    </>
  );
}

export default UnauthorizedPage;
