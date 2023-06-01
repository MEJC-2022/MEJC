import { ErrorBoundary } from 'react-error-boundary';
import { Outlet, useLocation } from 'react-router-dom';
import {
  HeaderResponsive,
  HeaderResponsiveProps,
} from '../../components/Navbar';
import { useEffect, useState } from 'react';
import { sendErrorLog } from '../../utils/sendErrorLog';
import RenderErrorPage from '../error-pages/RenderErrorPage';

export default function Admin() {
  const currentLocation = useLocation();
  const [errorBoundaryKey, setErrorBoundaryKey] = useState(
    currentLocation.pathname,
  );

  useEffect(() => {
    setErrorBoundaryKey(currentLocation.pathname);
  }, [currentLocation.pathname]);

  const headerLinks: HeaderResponsiveProps['links'] = [
    { link: '/admin/products', label: 'Products' },
    { link: '/admin/orders', label: 'Orders' },
    { link: '/admin/users', label: 'Users' },
  ];

  return (
    <div>
      <HeaderResponsive links={headerLinks} />
      <ErrorBoundary
        key={errorBoundaryKey}
        fallbackRender={({ error, resetErrorBoundary }) => (
          <RenderErrorPage
            error={error}
            resetErrorBoundary={resetErrorBoundary}
            wrapperKey={false}
          />
        )}
        onReset={(details) => {
          console.log(details);
        }}
        onError={sendErrorLog}
      >
        <main>
          <Outlet />
        </main>
      </ErrorBoundary>
    </div>
  );
}
