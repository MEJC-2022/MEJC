import { Outlet } from 'react-router-dom';
import {
  HeaderResponsive,
  HeaderResponsiveProps,
} from '../../components/Navbar';
import { ErrorBoundary } from "react-error-boundary";

export default function Admin() {
  const headerLinks: HeaderResponsiveProps['links'] = [
    { link: '/admin/products', label: 'Products' },
    { link: '/admin/orders', label: 'Orders' },
    { link: '/admin/users', label: 'Users' },
  ];

  return (
    <div>
      <HeaderResponsive links={headerLinks} />
      <ErrorBoundary fallback={<div>Something went wrong</div>}>
        <main>
          <Outlet />
        </main>
      </ErrorBoundary>
    </div>
  );
}
