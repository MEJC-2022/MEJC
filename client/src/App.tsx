import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';

function App() {
  const { handleSignInAsUser, handleSignInAsAdmin } = useAuth();

  useEffect(() => {
    async function userAuthentication() {
      try {
        const response = await fetch('/api/users/authentication');
        if (response.status === 200) {
          const result = await response.json();
          if (result.isAdmin) {
            handleSignInAsAdmin();
          } else {
            handleSignInAsUser();
          }
        }
      } catch (err) {
        console.error(
          'An error has occurred while trying to verify user authentication:\n',
          err,
        );
      }
    }

    userAuthentication();
  }, [handleSignInAsAdmin, handleSignInAsUser]);

  return <Outlet />;
}

export default App;
