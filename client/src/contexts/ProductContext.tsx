import { notifications } from '@mantine/notifications';
import { IconCheck, IconServerBolt } from '@tabler/icons-react';
import axios from 'axios';
import {
  ReactNode,
  createContext,
  useCallback,
  useEffect,
  useState,
} from 'react';

export interface Category {
  _id: string;
  title: string;
}
export interface Product {
  _id: string;
  image: string;
  title: string;
  description: string;
  price: number;
  stock: number;
  categories: Category[];
  createdAt: Date;
}

export interface CartItem extends Product {
  quantity: number;
}

interface ContextValue {
  products: Product[];
  deleteProduct: (id: string) => void;
  addProduct: (product: Product) => void;
  updateProduct: (product: Product) => void;
  fetchProducts: () => void;
  fetchAllCreatedProducts: () => void;
  allCreatedProducts: Product[];
}

export const ProductContext = createContext<ContextValue>(null as any);

interface Props {
  children: ReactNode;
}

export const ProductProvider: React.FC<Props> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [allCreatedProducts, setAllCreatedProducts] = useState<Product[]>([]);

  const fetchProducts = useCallback(async () => {
    try {
      const res = await axios.get('/api/products');

      if (res.status < 200 && res.status >= 300) {
        throw new Error('Fetching error');
      }

      setProducts(res.data);
    } catch (error) {
      notifications.show({
        icon: <IconServerBolt size={20} />,
        title: 'Error',
        message: 'Failed to fetch products',
        color: 'red',
        autoClose: false,
      });
      console.error('Error fetching products:', error);
    }
  }, []);

  const fetchAllCreatedProducts = useCallback(async () => {
    try {
      const res = await axios.get('/api/products/created');

      if (res.status < 200 && res.status >= 300) {
        throw new Error('Fetching error');
      }

      setAllCreatedProducts(res.data);
    } catch (error) {
      notifications.show({
        icon: <IconServerBolt size={20} />,
        title: 'Error',
        message: 'Failed to fetch products',
        color: 'red',
        autoClose: false,
      });
      console.error('Error fetching products:', error);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, []);

  async function deleteProduct(id: string) {
    try {
      const response = await axios.delete(`/api/products/${id}`);
      notifications.show({
        icon: <IconCheck />,
        title: 'Success!',
        message: 'The product has been deleted',
        color: 'green',
        autoClose: 3000,
        withCloseButton: false,
      });

      if (response.status < 200 && response.status >= 300) {
        throw new Error('Validation error');
      }

      setProducts((currentProducts) => {
        return currentProducts.filter((product) => product._id !== id);
      });
    } catch (error) {
      notifications.show({
        icon: <IconServerBolt size={20} />,
        title: 'Error',
        message: 'Failed to delete product',
        color: 'red',
        autoClose: false,
      });
      console.error('Error deleting product:', error);
    }
  }

  const addProduct = async (product: Product) => {
    try {
      const response = await fetch('/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(product),
      });

      if (!response.ok) {
        throw new Error('Validation error');
      }

      const newProduct = await response.json();

      setProducts((prevProducts) => [...prevProducts, newProduct]);

      notifications.show({
        icon: <IconCheck />,
        title: 'Success!',
        message: `You have created product "${product.title}"`,
        color: 'green',
        autoClose: 3000,
        withCloseButton: false,
      });
    } catch (error) {
      notifications.show({
        icon: <IconServerBolt size={20} />,
        title: 'Error',
        message: 'Failed to create product',
        color: 'red',
        autoClose: false,
      });
      console.error('Error creating product:', error);
    }
  };

  async function updateProduct(updatedProduct: Product) {
    try {
      const response = await axios.put(
        `/api/products/${updatedProduct._id}`,
        updatedProduct,
      );

      if (response.status < 200 && response.status >= 300) {
        throw new Error('Validation error');
      }

      setProducts((currentProducts) =>
        currentProducts.map((product) =>
          product._id === updatedProduct._id ? response.data : product,
        ),
      );
      notifications.show({
        icon: <IconCheck />,
        title: 'Success!',
        message: `You have edited product "${updatedProduct.title}"`,
        color: 'green',
        autoClose: 3000,
        withCloseButton: false,
      });
    } catch (error) {
      notifications.show({
        icon: <IconServerBolt size={20} />,
        title: 'Error',
        message: 'Failed to update product',
        color: 'red',
        autoClose: false,
      });
      console.error('Error updating product:', error);
    }
  }

  return (
    <ProductContext.Provider
      value={{
        products,
        deleteProduct,
        addProduct,
        updateProduct,
        fetchProducts,
        fetchAllCreatedProducts,
        allCreatedProducts,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export default ProductProvider;
