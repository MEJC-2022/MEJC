import express from 'express';
import {
  createProduct,
  deleteProduct,
  getAllCreatedProducts,
  getAllProducts,
  getProductById,
  updateProduct,
} from '../controllers/product-controller';
import { isAdmin } from '../middlewares/auth-checks';

const productRouter = express.Router();

// TODO: Add AUTH to this route
productRouter.post('/api/products', isAdmin, createProduct);
productRouter.get('/api/products', getAllProducts);
productRouter.get('/api/products/created', getAllCreatedProducts);
productRouter.get('/api/products/:id', getProductById);
productRouter.put('/api/products/:id', isAdmin, updateProduct);
productRouter.delete('/api/products/:id', isAdmin, deleteProduct);

export default productRouter;
