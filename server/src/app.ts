import express, { NextFunction, Request, Response } from 'express';
import productRouter from './routers/product-router';
import userRouter from './routers/user-router';

export const app = express();

// Global middlewares
app.use(express.json());

// Routers:
app.use(productRouter);
app.use(userRouter);

// Global error-handling:
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err);
  res.status(500).json(err.message);
});
