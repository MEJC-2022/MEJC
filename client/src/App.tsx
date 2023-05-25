import { Outlet } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';

function App() {
  async function userAuthentication() {
    const { handleSignInAsUser, handleSignInAsAdmin } = useAuth();
    const response = await fetch('/api/users/authentication');
    if (response.ok) {
      const result = await response.json();
      console.log(result)
      if (result.isAdmin) {
        handleSignInAsAdmin();
      } else {
        handleSignInAsUser();
      }
    }
  }
  userAuthentication();

  return <Outlet />;
}
export default App;
