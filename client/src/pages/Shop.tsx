import { ErrorBoundary } from 'react-error-boundary';
import { Outlet } from 'react-router-dom';
import { FooterCentered } from '../components/Footer';
import { HeaderResponsive, HeaderResponsiveProps } from '../components/Navbar';
import RenderErrorPage from './error-pages/RenderErrorPage';

function Shop() {
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
        fallbackRender={({ error, resetErrorBoundary }) => (
          <RenderErrorPage error={error} resetErrorBoundary={resetErrorBoundary} />
        )}
        onReset={(details) => {}}
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
