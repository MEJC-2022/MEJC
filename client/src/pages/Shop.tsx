import { Outlet } from 'react-router-dom';
import { FooterCentered } from '../components/Footer';
import { HeaderResponsive, HeaderResponsiveProps } from '../components/Navbar';
import { ErrorBoundary } from "react-error-boundary";

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
      <ErrorBoundary fallback={<div>Something went wrong</div>}>
        <main>
          <Outlet />
        </main>
      </ErrorBoundary>
      <FooterCentered links={footerLinks} />
    </div>
  );
}
export default Shop;
