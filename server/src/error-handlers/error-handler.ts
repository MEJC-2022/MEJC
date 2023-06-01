import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import * as yup from 'yup';
import { APIError } from './error-classes/api-error';
import { SessionError } from './error-classes/session-error';

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
    res
      .status(400)
      .json({ error: 'Validation error', messages: errorMessages });
  } else if (err instanceof mongoose.Error.ValidatorError) {
    res.status(400).json({ error: err.message });
  } else if (err instanceof mongoose.Error.DocumentNotFoundError) {
    res.status(404).json({ error: 'Resource not found' });
  } else if (err instanceof mongoose.Error.CastError) {
    res.status(400).json({ error: 'Invalid ID' });

    // Yup validation error
  } else if (err instanceof yup.ValidationError) {
    res.status(400).json({ error: 'Validation error' });

    // Custom errors
  } else if (err instanceof SessionError) {
    res
      .status(err.status)
      .json({ error: err.message, currentSession: err.session ?? undefined });
  } else if (err instanceof APIError) {
    res.status(err.status).json({ error: err.message });

    // Other errors
  } else if (err instanceof Error) {
    // should not send error details to client in production
    if (process.env.NODE_ENV === 'production') {
      res.status(500).json({ error: 'Unknown error' });
    } else {
      res.status(500).json({ error: err.message });
    }
  } else {
    res.status(500).json({ error: 'Unknown error' });
  }
}
