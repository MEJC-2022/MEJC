import { ErrorBoundary } from 'react-error-boundary';
import { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { FooterCentered } from '../components/Footer';
import { HeaderResponsive, HeaderResponsiveProps } from '../components/Navbar';
import { sendErrorLog } from '../utils/sendErrorLog';
import RenderErrorPage from './error-pages/RenderErrorPage';

function Shop() {
  const currentLocation = useLocation();
  const [errorBoundaryKey, setErrorBoundaryKey] = useState(currentLocation.pathname);

  useEffect(() => {
    setErrorBoundaryKey(currentLocation.pathname);
  }, [currentLocation.pathname]);

  const headerLinks: HeaderResponsiveProps['links'] = [
    { link: '/', label: 'Store' },
    { link: '/faq', label: 'FAQ' },
    { link: '/contact', label: 'Contact Us' },
  ];

  const footerLinks = [
    { link: '/terms-of-service', label: 'Terms of Service' },
    { link: '/privacy-policy', label: 'Privacy Policy' },
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
          />
        )}
        onReset={(details) => {
          location.reload();
        }}
        onError={sendErrorLog}
      >
        <main>
          <Outlet />
        </main>
      </ErrorBoundary>

      <FooterCentered links={footerLinks} />
    </div>
  );
}
export default Shop;
