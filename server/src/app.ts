import cookieSession from 'cookie-session';
import express from 'express';
import 'express-async-errors';
import { errorHandler } from './error-handlers/error-handler';
import categoryRouter from './routers/category-router';
import fileRouter from './routers/file-router';
import orderRouter from './routers/order-router';
import productRouter from './routers/product-router';
import userRouter from './routers/user-router';

export const app = express();

// Global middlewares
app.use(express.json());
app.use(
  cookieSession({
    name: 'loginSession',
    secure: false,
    httpOnly: true,
    secret: '97d28h8AHSas8dx8A92ppdkj',
    maxAge: 1000 * 60 * 60 * 24 * 7 * 26, // 6 months
  }),
);

// Routers
app.use(productRouter);
app.use(fileRouter);
app.use(userRouter);
app.use(categoryRouter);
app.use(orderRouter);

// Error handling
app.use(errorHandler);
app.post('/api/errors', (req, res) => {
  console.error(req.body);
  res.status(204).end();
});
