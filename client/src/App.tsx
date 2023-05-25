import { Outlet } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';

function App() {
  async function userAuthentication() {
    try {
      const { handleSignInAsUser, handleSignInAsAdmin } = useAuth();
      const response = await fetch('/api/users/authentication');
      if (response.ok) {
        const result = await response.json();
        if (result.isAdmin) {
          handleSignInAsAdmin();
        } else {
          handleSignInAsUser();
        }
      }
    } catch (err) {
      console.error('An error has occured trying verify user authentication:\n', err);
    }
  }
  userAuthentication();

  return <Outlet />;
}
export default App;
