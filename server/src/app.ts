import express, { NextFunction, Request, Response } from 'express';
import cookieSession from 'cookie-session';
import productRouter from './routers/product-router';
import userRouter from './routers/user-router';

export const app = express();

// Global middlewares
app.use(express.json());
app.use(
  cookieSession({
    name: 'session',
    secure: false,
    secret: '97d28h8AHSas8dx8A92ppdkj',
    maxAge: 1000 * 60 * 60 * 24 * 7 * 26, // 6 months
  }),
);

// Routers:
app.use(productRouter);
app.use(userRouter);

// Global error-handling:
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err);
  res.status(500).json(err.message);
});
