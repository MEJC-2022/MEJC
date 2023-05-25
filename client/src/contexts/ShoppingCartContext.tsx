import { createContext, ReactNode, useContext, useState } from 'react';
import { FormValues } from '../components/CheckoutForm';
import { CartItem } from '../contexts/ProductContext';
import useLocalStorage from '../hooks/useLocalStorage';
import { useAuth } from './AuthContext';
import { ProductContext } from './ProductContext';

interface ShoppingCartContext {
  getProductQuantity: (id: string) => number;
  increaseCartQuantity: (id: string) => void;
  decreaseCartQuantity: (id: string) => void;
  removeFromCart: (id: string) => void;
  cartProducts: CartItem[];
  cartQuantity: number;
  order: Order | null;
  addOrder: (cartProducts: CartItem[], formData: FormValues) => void;
  setOrder: (order: Order | null) => void;
  loading: boolean;
}

interface Order {
  userId: string | null;
  orderItems: CartItem[];
  address: FormValues;
}

export function useShoppingCart() {
  return useContext(ShoppingCartContext);
}

export const ShoppingCartContext = createContext<ShoppingCartContext>(
  null as any,
);

interface Props {
  children: ReactNode;
}

function ShoppingCartProvider({ children }: Props) {
  const { products } = useContext(ProductContext);
  const [cartProducts, setCartProducts] = useLocalStorage<CartItem[]>(
    'cart',
    [],
  );

  const [order, setOrder] = useLocalStorage<Order | null>('Order', null);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const cartQuantity = cartProducts.reduce(
    (quantity, product) => product.quantity + quantity,
    0,
  );

  function getProductQuantity(id: string) {
    return cartProducts.find((product) => product._id === id)?.quantity || 0;
  }

  function increaseCartQuantity(id: string) {
    const productToAdd = products.find((product) => product._id === id);
    if (!productToAdd) {
      return;
    }

    setCartProducts((currentProducts) => {
      if (currentProducts.find((product) => product._id === id) == null) {
        return [...currentProducts, { ...productToAdd, quantity: 1 }];
      } else {
        return currentProducts.map((product) => {
          if (product._id === id) {
            return { ...product, quantity: product.quantity + 1 };
          } else {
            return product;
          }
        });
      }
    });
  }

  function decreaseCartQuantity(id: string) {
    setCartProducts((currentProducts) => {
      if (
        currentProducts.find((product) => product._id === id)?.quantity === 1
      ) {
        return currentProducts.filter((product) => product._id !== id);
      } else {
        return currentProducts.map((product) => {
          if (product._id === id) {
            return { ...product, quantity: product.quantity - 1 };
          } else {
            return product;
          }
        });
      }
    });
  }

  function removeFromCart(id: string) {
    setCartProducts((currentProducts) => {
      return currentProducts.filter((product) => product._id !== id);
    });
  }

  const addOrder = async (cartProducts: CartItem[], formData: FormValues) => {
    setLoading(true);
    const newOrder: Order = {
      userId: user !== null ? user._id : null,
      orderItems: [...cartProducts],
      address: formData,
    };

    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newOrder),
      });

      if (response.ok) {
        setOrder(newOrder);
        setCartProducts([]);
      } else {
        const message = await response.text();
        setOrder(null);
        throw new Error(message);
      }
    } catch (error) {
      setOrder(null);
      console.error('Error creating order:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ShoppingCartContext.Provider
      value={{
        getProductQuantity,
        increaseCartQuantity,
        decreaseCartQuantity,
        removeFromCart,
        cartProducts,
        cartQuantity,
        order,
        addOrder,
        setOrder,
        loading,
      }}
    >
      {children}
    </ShoppingCartContext.Provider>
  );
}

export default ShoppingCartProvider;
