import express from 'express';
import {
  createProduct,
  getAllProducts,
} from '../controllers/product-controller';

const productRouter = express.Router();

productRouter.post('/api/products', createProduct);
productRouter.get('/api/products', getAllProducts);

export default productRouter;
