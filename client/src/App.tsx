import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';

function App() {
  const { userAuthentication } = useAuth();
  useEffect(() => {
    userAuthentication();
  }, [userAuthentication]);

  return <Outlet />;
}

export default App;
