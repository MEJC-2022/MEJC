import { Button } from '@mantine/core';
import {
  IconLogin,
  IconLogout,
  IconUser,
  IconUserShield,
} from '@tabler/icons-react';
import { Link } from 'react-router-dom';
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
        <Icon size="1.8rem" stroke="1.3" />
      </Button>
    </Link>
  );
}

export function AdminButton() {
  return <ButtonLink to="/admin" icon={IconUserShield} />;
}

export function SignInButton() {
  return <ButtonLink to="/signin" icon={IconLogin} />;
}

export function UserButton() {
  return <ButtonLink to="/orders" icon={IconUser} />;
}

export function SignOutButton() {
  const { setIsSignedIn } = useAuth();
  //Kommer behöva ändras
  const handleSignOut = () => {
    setIsSignedIn(false);
  };

  return <ButtonLink to="/" icon={IconLogout} onClick={handleSignOut} />;
}

const buttonStyling = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
};
