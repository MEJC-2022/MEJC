import express from 'express';
import {
  createOrder,
  getAllOrders,
  getOrderById,
  getOrdersByUserId,
  shipOrder,
} from '../controllers/order-controller';
import {
  validateOrder,
  validateOrderId,
} from '../validations/order-validation';

const orderRouter = express.Router();

// TODO: add authentication middlewares for routes
orderRouter.post('/api/orders', validateOrder, createOrder);
orderRouter.get('/api/orders', getAllOrders);
orderRouter.get('/api/orders/:id', getOrderById);
orderRouter.get('/api/orders/user/:id', getOrdersByUserId);
orderRouter.patch('/api/orders/:id', validateOrderId, shipOrder);

export default orderRouter;
