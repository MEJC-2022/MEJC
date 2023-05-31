import { ErrorBoundary } from 'react-error-boundary';
import { Outlet } from 'react-router-dom';
import {
  HeaderResponsive,
  HeaderResponsiveProps,
} from '../../components/Navbar';
import PageNotFound from '../error-pages/RenderErrorPage';

export default function Admin() {
  const headerLinks: HeaderResponsiveProps['links'] = [
    { link: '/admin/products', label: 'Products' },
    { link: '/admin/orders', label: 'Orders' },
    { link: '/admin/users', label: 'Users' },
  ];

  return (
    <div>
      <HeaderResponsive links={headerLinks} />
      <ErrorBoundary fallbackRender={PageNotFound} onReset={(details) => {}}>
        <main>
          <Outlet />
        </main>
      </ErrorBoundary>
    </div>
  );
}
