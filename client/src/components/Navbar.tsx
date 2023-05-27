import {
  Box,
  Burger,
  Button,
  Container,
  Group,
  Header,
  MediaQuery,
  Paper,
  Transition,
  createStyles,
  rem,
  useMantineColorScheme,
  useMantineTheme,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconShoppingCart } from '@tabler/icons-react';
import { useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useShoppingCart } from '../contexts/ShoppingCartContext';
import {
  AdminButton,
  OrderButton,
  SignInButton,
  SignOutButton,
} from './HeaderIcons';
import { ToggleColorButton } from './ToggleColorButton';

const HEADER_HEIGHT = rem(70);

const useStyles = createStyles((theme) => ({
  root: {
    position: 'sticky',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 2,
  },

  dropdown: {
    position: 'absolute',
    top: HEADER_HEIGHT,
    left: 0,
    right: 0,
    zIndex: 0,
    borderTopRightRadius: 0,
    borderTopLeftRadius: 0,
    borderTopWidth: 0,
    overflow: 'hidden',
  },

  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '100%',
    width: '100%',
  },

  hide: {
    display: 'none',
  },

  link: {
    display: 'block',
    lineHeight: 1,
    padding: `${rem(8)} ${rem(10)}`,
    borderRadius: theme.radius.sm,
    textDecoration: 'none',
    color:
      theme.colorScheme === 'dark'
        ? theme.colors.dark[0]
        : theme.colors.gray[7],
    fontSize: theme.fontSizes.sm,
    fontWeight: 500,

    '&:hover': {
      backgroundColor:
        theme.colorScheme === 'dark'
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
    },

    [theme.fn.smallerThan('sm')]: {
      borderRadius: 0,
      padding: theme.spacing.md,
    },
  },

  linkActive: {
    '&, &:hover': {
      backgroundColor: theme.fn.variant({
        variant: 'light',
        color: theme.primaryColor,
      }).background,
      color: theme.fn.variant({ variant: 'light', color: theme.primaryColor })
        .color,
    },
  },
}));
export interface HeaderResponsiveProps {
  links: { link: string; label: string }[];
}

export function HeaderResponsive({ links }: HeaderResponsiveProps) {
  const [opened, { toggle, close }] = useDisclosure(false);
  const [active, setActive] = useState(links[0].link);
  const { classes, cx } = useStyles();
  const { cartQuantity } = useShoppingCart();
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const [logoType, setLogoType] = useState('dark');
  const theme = useMantineTheme();
  const { user, setUser } = useAuth();
  const navigate = useNavigate();
  const currentLocation = useLocation();
  const isAdminRoute = location.pathname.includes('/admin');

  const handleSignOut = async () => {
    try {
      const response = await fetch('/api/users/logout', {
        method: 'POST',
        credentials: 'include',
      });

      if (response.ok) {
        setUser(null);
        navigate('/');
        location.reload();
      }
      if (response.status === 401) {
        console.error('You are already logged out');
      }
    } catch (err) {
      console.error('An error has occured trying to logout:\n', err);
    }
  };

  useEffect(() => {
    setLogoType(colorScheme === 'dark' ? 'light' : 'dark');
  }, [colorScheme]);

  const handleToggleColorScheme = () => {
    toggleColorScheme();
  };

  const logo =
    logoType === 'dark' ? (
      <img src="/assets/T101-logo.svg" alt="T101 logo" />
    ) : (
      <img src="/assets/T101-logo-darkmode.svg" alt="T101 logo" />
    );

  const items = links.map((link, index) => (
    <ul key={index}>
      <Link
        key={link.label}
        to={link.link}
        className={cx(classes.link, {
          [classes.linkActive]: active === link.link,
        })}
        onClick={() => {
          setActive(link.link);
          close();
        }}
      >
        {link.label}
      </Link>
    </ul>
  ));

  const [isBurgerVisible, setIsBurgerVisible] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (user?.isAdmin) {
        setIsBurgerVisible(window.innerWidth < 840);
      } else {
        setIsBurgerVisible(window.innerWidth < 768);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [user]);

  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (headerRef.current) {
      if (isBurgerVisible) {
        headerRef.current.style.marginBottom = opened ? '200px' : '0';
      } else {
        headerRef.current.style.marginBottom = '0';
      }
    }
  }, [opened, isBurgerVisible]);

  function handleLinkClick() {
    setActive(links[0].link);
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }

  return (
    <Header
      height={HEADER_HEIGHT}
      mb={headerRef.current ? (isBurgerVisible ? 200 : 0) : 0}
      ref={headerRef}
      className={classes.root}
    >
      <Container sx={{ maxWidth: 'none' }} className={classes.header}>
        <MediaQuery
          query="(max-width: 460px)"
          styles={{
            img: {
              width: '6rem',
              height: '6rem',
            },
          }}
        >
          <Link to="/" onClick={handleLinkClick}>
            <Group spacing={1}>{logo}</Group>
          </Link>
        </MediaQuery>
        <Group spacing={5} className={cx({ [classes.hide]: isBurgerVisible })}>
          {items}
        </Group>
        <Group spacing={1}>
          <ToggleColorButton onToggleColorScheme={handleToggleColorScheme} />
          {user ? (
            <>
              {user.isAdmin && <AdminButton />}
              {!isBurgerVisible && user.isAdmin && !isAdminRoute && (
                <OrderButton />
              )}
              {!user.isAdmin && <OrderButton />}
              {!isBurgerVisible && <SignOutButton />}
            </>
          ) : (
            <SignInButton />
          )}
          {!isAdminRoute && (
            <Link
              to="/checkout"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Button
                onClick={handleLinkClick}
                size="xs"
                variant="subtle"
                data-cy="cart-link"
                radius="xl"
              >
                <IconShoppingCart size={29} stroke="1.2" />
                {cartQuantity > 0 && (
                  <Box
                    sx={{
                      borderRadius: '10rem',
                      background: theme.colors.blue[4],
                      color: 'white',
                      width: '1.1rem',
                      height: '1.1rem',
                      position: 'absolute',
                      bottom: 0,
                      right: 0,
                      display: 'flex',
                      transform: 'translate(-30%, -95%)',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                    data-cy="cart-items-count-badge"
                  >
                    {cartQuantity}
                  </Box>
                )}
              </Button>
            </Link>
          )}
        </Group>
        <Burger
          opened={opened}
          onClick={toggle}
          className={cx({ [classes.hide]: !isBurgerVisible })}
          size="sm"
        />
        <Transition transition="pop-top-right" duration={200} mounted={opened}>
          {(styles) => (
            <Paper
              className={cx(classes.dropdown, {
                [classes.hide]: !isBurgerVisible,
              })}
              withBorder
              style={styles}
            >
              {items}
              {user ? (
                <>
                  {user.isAdmin && !isAdminRoute && (
                    <ul key="4">
                      <Link
                        key="orders"
                        to="/orders"
                        className={classes.link}
                        onClick={() => {
                          close();
                        }}
                      >
                        My Orders
                      </Link>
                    </ul>
                  )}
                  <ul key="5">
                    <Link
                      key="signout"
                      to="/"
                      className={classes.link}
                      onClick={() => {
                        close();
                        handleSignOut();
                      }}
                    >
                      Sign out
                    </Link>
                  </ul>
                </>
              ) : null}
            </Paper>
          )}
        </Transition>
      </Container>
    </Header>
  );
}
