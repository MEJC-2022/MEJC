import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import { ServerError } from './error-classes/server-error';

export function errorHandler(
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  // Global error handling
  console.error(err);

  // should not send error messages to the client in production
  //   if (process.env.NODE_ENV === 'production') {
  //     return res.status(500).json('Unknown error');
  //   }

  // Error handling for specific errors

  if (err instanceof mongoose.Error.ValidationError) {
    return res.status(400).json(err.message);
  } else if (err instanceof ServerError) {
    return res.status(err.status).json(err.message);
  } else if (err instanceof Error) {
    res.status(500).json(err.message);
  } else {
    res.status(500).json('Unknown error');
  }
}
