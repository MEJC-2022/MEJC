import express from 'express';
import {
  createOrder,
  getAllOrders,
  getOrderById,
  getOrdersByUserId,
} from '../controllers/order-controller';

const orderRouter = express.Router();

// TODO: add authentication middlewares for routes
orderRouter.post('/api/orders', createOrder);
orderRouter.get('/api/orders', getAllOrders);
orderRouter.get('/api/orders/:id', getOrderById);
orderRouter.get('/api/orders/user/:id', getOrdersByUserId);

export default orderRouter;
