import { Box, Button, createStyles } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import {
  IconBuildingStore,
  IconCheck,
  IconLogin,
  IconLogout,
  IconPackage,
  IconUserShield,
} from '@tabler/icons-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

interface ButtonLinkProps {
  to: string;
  icon: React.ElementType;
  onClick?: () => void;
}

function ButtonLink({ to, icon: Icon, onClick }: ButtonLinkProps) {
  return (
    <Link to={to} style={buttonStyling}>
      <Button size="xs" variant="subtle" radius="xl" onClick={onClick}>
        <Icon size={29} stroke="1.3" />
      </Button>
    </Link>
  );
}

export function AdminButton() {
  return <ButtonLink to="/admin" icon={IconUserShield} />;
}

export function ShopButton() {
  return <ButtonLink to="/" icon={IconBuildingStore} />;
}

export function SignInButton() {
  return <ButtonLink to="/signin" icon={IconLogin} />;
}

export function OrderButton() {
  const { classes, cx } = useStyles();
  const currentLocation = useLocation();
  return (
    <Box
      className={cx({
        [classes.iconLinkActive]: currentLocation.pathname === '/orders',
        [classes.iconLinkInactive]: currentLocation.pathname !== '/orders',
      })}
    >
      <ButtonLink to="/orders" icon={IconPackage} />
    </Box>
  );
}

export function SignOutButton() {
  const navigate = useNavigate();
  const { setUser } = useAuth();
  const handleSignOut = async () => {
    try {
      const response = await fetch('/api/users/logout', {
        method: 'POST',
        credentials: 'include',
      });

      if (response.ok) {
        setUser(null);
        notifications.show({
          icon: <IconCheck />,
          title: `You have successfully logged out`,
          message: 'Hope to see you again soon!',
          color: 'green',
          autoClose: 3000,
          withCloseButton: false,
        });
        navigate('/');
      }
      if (response.status === 401) {
        console.error('You are already logged out');
      }
    } catch (err) {
      console.error('An error has occured trying to logout:\n', err);
    }
  };

  return (
    <Button
      size="xs"
      variant="subtle"
      radius="xl"
      onClick={handleSignOut}
      style={buttonStyling}
    >
      <IconLogout size={29} stroke="1.3" />
    </Button>
  );
}

const buttonStyling = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
};

const useStyles = createStyles((theme) => ({
  iconLinkActive: {
    borderRadius: theme.radius.lg,
    paddingTop: '0.2rem',
    marginTop: '0.1rem',
    backgroundColor: theme.colorScheme === 'dark' ? '#316ca3' : '#e7f5ff', // Replace with your desired hover background colors
  },
  iconLinkInactive: {
    marginTop: '0.3rem',
    padding: '0rem',
  },
}));
