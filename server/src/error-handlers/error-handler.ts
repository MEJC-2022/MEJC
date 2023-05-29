import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import { SessionError } from './error-classes/server-error';

export function errorHandler(
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  // Logs every error
  console.error(err);

  // Mongoose/MongoDB errors
  if (err instanceof mongoose.Error.ValidationError) {
    const validationErrors = err.errors;
    const errorMessages = Object.values(validationErrors).map(
      (error) => error.message,
    );
    return res
      .status(400)
      .json({ error: 'Validation error', messages: errorMessages });
  } else if (err instanceof mongoose.Error.ValidatorError) {
    return res.status(400).json(err.message);
  } else if (err instanceof mongoose.Error.DocumentNotFoundError) {
    return res.status(404).json({ error: 'Resource not found' });
  } else if (err instanceof mongoose.Error.CastError) {
    return res.status(400).json({ error: 'Invalid ID' });

    // Custom errors
  } else if (err instanceof SessionError) {
    return res
      .status(err.status)
      .json({ error: err.message, session: err.session ?? undefined });

    // Other errors
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
