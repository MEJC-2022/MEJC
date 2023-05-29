import express from 'express';
import {
  createOrder,
  getAllOrders,
  getOrdersByUserId,
  shipOrder,
} from '../controllers/order-controller';
import { isAdmin, isLoggedIn } from '../middlewares/auth-checks';
import {
  validateOrder,
  validateOrderId,
} from '../validations/order-validation';

const orderRouter = express.Router();

orderRouter.post('/api/orders', isLoggedIn, validateOrder, createOrder);
orderRouter.get('/api/orders', isAdmin, getAllOrders);
// orderRouter.get('/api/orders/:id', isLoggedIn, getOrderById);
orderRouter.get('/api/orders/user/:id', isLoggedIn, getOrdersByUserId);
orderRouter.patch('/api/orders/:id', isAdmin, validateOrderId, shipOrder);

export default orderRouter;
