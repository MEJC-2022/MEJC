import express from 'express';
import { createProduct, getProducts } from '../controllers/product-controller';

const productRouter = express.Router();

productRouter.post('/api/products', createProduct);
productRouter.get('/api/products', getProducts);

export default productRouter;
