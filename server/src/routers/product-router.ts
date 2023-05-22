import express from 'express';
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getProductById,
  updateProduct,
} from '../controllers/product-controller';

const productRouter = express.Router();

productRouter.post('/api/products', createProduct);
productRouter.get('/api/products', getAllProducts);
productRouter.get('/api/products/:id', getProductById);
productRouter.put('/api/products/:id', updateProduct);
productRouter.delete('/api/products/:id', deleteProduct);

export default productRouter;
