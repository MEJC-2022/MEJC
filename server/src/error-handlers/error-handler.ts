import { NextFunction, Request, Response } from 'express';

export function errorHandler(
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  console.error(err);
  // logging/pinging every error Express catches

  // should not send error messages to the client in production
  //   if (process.env.NODE_ENV === 'production') {
  //     return res.status(500).json('Unknown error');
  //   }

  // error handling for specific errors
  // reminder: express can only send one response per request
  // including the
  //   if (err instanceof mongoose.Error.ValidationError) {
  //     return res.status(400).json(err.message);
  //   } else if (err instanceof APIError) {
  //     return res.status(err.status).json(err.message);
  //   } else if (err instanceof Error) {
  //     res.status(500).json(err.message);
  //   } else {
  res.status(500).json('Unknown error');
  //   }
}
