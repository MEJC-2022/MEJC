import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import { ServerError } from './error-classes/server-error';

export function errorHandler(
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  // Logs every error to the console
  console.error(err);

  // Sends error messages to client based on error type
  if (
    err instanceof mongoose.Error.ValidationError ||
    err instanceof mongoose.Error.ValidatorError
  ) {
    return res.status(400).json(err.message);
  } else if (err instanceof mongoose.Error.DocumentNotFoundError) {
    return res.status(404).json({ error: 'Resource not found' });
  } else if (err instanceof mongoose.Error.CastError) {
    return res.status(400).json({ error: 'Invalid ID' });
  } else if (err instanceof ServerError) {
    return res.status(err.status).json(err.message);
  } else if (err instanceof Error) {
    // should not send error details to client in production
    if (process.env.NODE_ENV === 'production') {
      return res.status(500).json('Unknown error');
    } else {
      return res.status(500).json(err.message);
    }
  } else {
    res.status(500).json('Unknown error');
  }
}
