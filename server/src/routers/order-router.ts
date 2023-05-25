import express from 'express';
import { createOrder } from '../controllers/order-controller';

const orderRouter = express.Router();

orderRouter.post('/api/orders', createOrder);

export default orderRouter;
