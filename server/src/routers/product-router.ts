import express from 'express';
import { addProduct } from '../controllers/product-controller';

const productRouter = express.Router();

productRouter.post('/api/products', addProduct);

export default productRouter;
