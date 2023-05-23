import { Request, Response, NextFunction } from "express";

export function isAdmin(req: Request, res: Response, next: NextFunction) {
  try {
    if (req.session && req.session.user && req.session.user.isAdmin) {
      next();
    } else {
      res.status(403).json('You are not authorized.');
    }
  } catch (err) {
    console.error(err);
  }
}