import axios from 'axios';
import {
  createContext,
  ReactNode,
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
}

export const ProductContext = createContext<ContextValue>(null as any);

interface Props {
  children: ReactNode;
}

export const ProductProvider: React.FC<Props> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);

  const fetchProducts = useCallback(async () => {
    const res = await axios.get('/api/products');
    setProducts(res.data);
  }, []);

  useEffect(() => {
    fetchProducts();
  }, []);

  async function deleteProduct(id: string) {
    await axios.delete(`/api/products/${id}`);
    setProducts((currentProducts) => {
      return currentProducts.filter((product) => product._id !== id);
    });
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
      const newProduct = await response.json();
      setProducts((prevProducts) => [...prevProducts, newProduct]);
    } catch (error) {
      console.error('Error creating product:', error);
    }
  };

  async function updateProduct(updatedProduct: Product) {
    const res = await axios.put(
      `/api/products/${updatedProduct._id}`,
      updatedProduct,
    );

    setProducts((currentProducts) =>
      currentProducts.map((product) =>
        product._id === updatedProduct._id ? res.data : product,
      ),
    );
  }

  return (
    <ProductContext.Provider
      value={{
        products,
        deleteProduct,
        addProduct,
        updateProduct,
        fetchProducts,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export default ProductProvider;
