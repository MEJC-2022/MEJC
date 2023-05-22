import express from 'express';
import { createProduct } from '../controllers/product-controller';

const productRouter = express.Router();

productRouter.post('/api/products', createProduct);

export default productRouter;
