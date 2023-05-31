import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';
import ScrollToTop from './utils/ScrollToTop';

function App() {
  const { userAuthentication } = useAuth();
  useEffect(() => {
    userAuthentication();
  }, [userAuthentication]);

  return (
    <>
      <ScrollToTop />
      <Outlet />
    </>
  );
}

export default App;
