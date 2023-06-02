import { NextFunction, Request, Response } from 'express';

export function isAdmin(req: Request, res: Response, next: NextFunction) {
  if (req.session && req.session.user) {
    if (req.session.user.isAdmin) {
      next();
    } else {
      res.status(401).json(`You're not authorized`);
    }
  } else {
    res.status(401).json(`You're not logged in`);
  }
}

export function isLoggedIn(req: Request, res: Response, next: NextFunction) {
  if (req.session && req.session.user) {
    next();
  } else {
    res.status(401).json(`You're not logged in`);
  }
}

export function checkSession(req: Request, res: Response, next: NextFunction) {
  if (req.session && req.session.user) {
    res.json(req.session?.user);
  } else {
    res.status(204).end();
  }
}
