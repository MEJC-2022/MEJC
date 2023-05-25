import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';

function App() {
  const { setUser } = useAuth();

  useEffect(() => {
    async function userAuthentication() {
      try {
        const response = await fetch('/api/users/authentication');
        if (response.status === 200) {
          const user = await response.json();
          setUser(user);
          // if (user.isAdmin) {
          //   handleSignInAsAdmin();
          // } else {
          //   handleSignInAsUser();
          // }
        }
      } catch (err) {
        console.error(
          'An error has occurred while trying to verify user authentication:\n',
          err,
        );
      }
    }

    userAuthentication();
  }, [setUser]);

  return <Outlet />;
}

export default App;
