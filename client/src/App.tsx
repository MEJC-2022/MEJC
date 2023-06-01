import { useEffect, useState } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { Outlet, useLocation } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';
import RenderErrorPage from './pages/error-pages/RenderErrorPage';
import ScrollToTop from './utils/ScrollToTop';
import { sendErrorLog } from './utils/sendErrorLog';

function App() {
  const { userAuthentication } = useAuth();
  const currentLocation = useLocation();
  const [errorBoundaryKey, setErrorBoundaryKey] = useState(
    currentLocation.pathname,
  );
  useEffect(() => {
    userAuthentication();
  }, [userAuthentication]);

  useEffect(() => {
    setErrorBoundaryKey(currentLocation.pathname);
  }, [currentLocation.pathname]);

  return (
    <ErrorBoundary
      key={errorBoundaryKey}
      fallbackRender={({ error, resetErrorBoundary }) => (
        <RenderErrorPage
          error={error}
          resetErrorBoundary={resetErrorBoundary}
          wrapperKey={true}
        />
      )}
      onReset={(details) => {
        location.reload();
      }}
      onError={sendErrorLog}
    >
      <ScrollToTop />
      <Outlet />
    </ErrorBoundary>
  );
}

export default App;
