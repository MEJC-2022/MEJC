import {
  ColorScheme,
  ColorSchemeProvider,
  MantineProvider,
} from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import {
  Navigate,
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';
import App from './App';
import AuthProvider from './contexts/AuthContext';
import ProductProvider from './contexts/ProductContext';
import ShoppingCartProvider from './contexts/ShoppingCartContext';
import './index.css';
import Cart from './pages/Cart';
import Confirmation from './pages/Confirmation';
import { Contact } from './pages/Contact';
import { Faq } from './pages/Faq';
import Home from './pages/Home';
import ProductDetails from './pages/ProductDetails';
import Shop from './pages/Shop';
import { SignInForm } from './pages/SignIn';
import { default as SignUp } from './pages/SignUp';
import UserOrders from './pages/UserOrders';
import Admin from './pages/admin/Admin';
import AdminOrders from './pages/admin/AdminOrders';
import AdminProducts from './pages/admin/AdminProducts';
import AdminUsers from './pages/admin/AdminUsers';
import EditProduct from './pages/admin/EditProduct';
import NewProduct from './pages/admin/NewProduct';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="/" element={<Shop />}>
        <Route index element={<Home />} />
        <Route path="faq" element={<Faq />} />
        <Route path="contact" element={<Contact />} />
        <Route path="product/:id" element={<ProductDetails />} />
        <Route path="checkout" element={<Cart />} />
        <Route path="confirmation" element={<Confirmation />} />
        <Route path="signin" element={<SignInForm />} />
        <Route path="signup" element={<SignUp />} />
        <Route path="orders" element={<UserOrders />} />
      </Route>

      <Route path="admin/*" element={<Admin />}>
        <Route index element={<Navigate to="products" />} />
        <Route path="products" element={<AdminProducts />} />
        <Route path="product/:id" element={<EditProduct />} />
        <Route path="product/:id/edit" element={<EditProduct />} />
        <Route path="product/new" element={<NewProduct />} />
        <Route path="orders" element={<AdminOrders />} />
        <Route path="users" element={<AdminUsers />} />
      </Route>
    </Route>,
  ),
);

function Root() {
  const [colorScheme, setColorScheme] = useState<ColorScheme>('light');
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));
  return (
    <React.StrictMode>
      <ColorSchemeProvider
        colorScheme={colorScheme}
        toggleColorScheme={toggleColorScheme}
      >
        <MantineProvider
          theme={{
            colorScheme,
            primaryColor: 'blue',
          }}
          withGlobalStyles
          withNormalizeCSS
        >
          <Notifications data-cy="added-to-cart-toast" />
          <AuthProvider>
            <ProductProvider>
              <ShoppingCartProvider>
                <RouterProvider router={router} />
              </ShoppingCartProvider>
            </ProductProvider>
          </AuthProvider>
        </MantineProvider>
      </ColorSchemeProvider>
    </React.StrictMode>
  );
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Root />,
);
