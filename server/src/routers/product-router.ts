import express from 'express';
import { createProduct } from '../controllers/product-controller';

const productRouter = express.Router();

productRouter.post('/products', createProduct);

export default productRouter;
