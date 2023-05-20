import { Outlet } from 'react-router-dom';
import {
  HeaderResponsive,
  HeaderResponsiveProps,
} from '../../components/Navbar';

export default function Admin() {
  const headerLinks: HeaderResponsiveProps['links'] = [
    { link: '/admin/products', label: 'Products' },
    { link: '/admin/orders', label: 'Orders' },
    { link: '/admin/users', label: 'Users' },
  ];

  return (
    <div>
      <HeaderResponsive links={headerLinks} />
      <main>
        <Outlet />
      </main>
    </div>
  );
}
