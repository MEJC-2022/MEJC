import express from 'express';
import { createProduct } from '../controllers/product-controller';

const productRouter = express.Router();

// TODO: Add AUTH to this route
productRouter.post('/api/products', createProduct);

export default productRouter;
