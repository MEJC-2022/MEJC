import cookieSession from 'cookie-session';
import express, { NextFunction, Request, Response } from 'express';
import categoryRouter from './routers/category-router';
import 'express-async-errors';
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

// Routers:
app.use(productRouter);
app.use(fileRouter);
app.use(userRouter);
app.use(categoryRouter);
app.use(orderRouter);

// Global error-handling:
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err);
  res.status(500).json(err.message);
});

// // Global error-handling:
// app.use((err: unknown, req: Request, res: Response, next: NextFunction) => {
//   console.error(err);
//   // logga felet till databasen
//   // pinga slack / discord

//   // Var försiktig med att skicka felmeddelanden till klienten i produktion
//   if (process.env.NODE_ENV === 'production') {
//     return res.status(500).json('Unknown error');
//   }

//   if (err instanceof mongoose.Error.ValidationError) {
//     return res.status(400).json(err.message);
//   } else if (err instanceof APIError) {
//     return res.status(err.status).json(err.message);
//   } else if (err instanceof Error) {
//     res.status(500).json(err.message);
//   } else {
//     res.status(500).json('Unknown error');
//   }
// });

// export class APIError extends Error {
//   constructor(message: string, public status: number) {
//     super(message);
//   }
// }
