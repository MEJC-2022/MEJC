import { NextFunction, Request, Response } from 'express';

export function isAdmin(req: Request, res: Response, next: NextFunction) {
  try {
    if (req.session && req.session.user && req.session.user.isAdmin) {
      next();
    } else {
      res.status(401).json('You do not have admin rights');
    }
  } catch (err) {
    console.error('An error has occurred during admin authorization:\n', err);
    res.status(500).json({ error: 'Admin status could not be verified' });
  }
}
