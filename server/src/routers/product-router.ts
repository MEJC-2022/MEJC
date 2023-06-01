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
import {
  validateProduct,
  validateProductId,
} from '../validations/product-validation';

const productRouter = express.Router();

productRouter.post('/api/products', isAdmin, validateProduct, createProduct);
productRouter.get('/api/products', getAllProducts);
productRouter.get('/api/products/created', getAllCreatedProducts);
productRouter.get('/api/products/:id', getProductById);
productRouter.put(
  '/api/products/:id',
  isAdmin,
  validateProductId,
  updateProduct,
);
productRouter.delete(
  '/api/products/:id',
  isAdmin,
  validateProductId,
  deleteProduct,
);

export default productRouter;
