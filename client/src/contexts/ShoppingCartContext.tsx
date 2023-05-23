import { createContext, ReactNode, useContext } from 'react';
import { FormValues } from '../components/CheckoutForm';
import { CartItem } from '../contexts/ProductContext';
import useLocalStorage from '../hooks/useLocalStorage';
import { ProductContext } from './ProductContext';

interface ShoppingCartContext {
  getProductQuantity: (id: string) => number;
  increaseCartQuantity: (id: string) => void;
  decreaseCartQuantity: (id: string) => void;
  removeFromCart: (id: string) => void;
  cartProducts: CartItem[];
  cartQuantity: number;
  orders: Order[];
  addOrder: (cartProducts: CartItem[], formData: FormValues) => void;
}

interface Order {
  orderId: number;
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

  const [orders, setOrders] = useLocalStorage<Order[]>('Orders:', []);

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
    const newOrder: Order = {
      orderId: orders.length + 1,
      orderItems: [...cartProducts],
      address: formData,
    };

    console.log(orders);
    setCartProducts([]);

    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newOrder),
      });

      if (response.ok) {
        setOrders((prevOrders) => [...prevOrders, newOrder]);
      } else {
        const message = await response.text();
        throw new Error(message);
      }
    } catch (error) {
      console.error('Error creating post:', error);
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
        orders,
        addOrder,
      }}
    >
      {children}
    </ShoppingCartContext.Provider>
  );
}

export default ShoppingCartProvider;
