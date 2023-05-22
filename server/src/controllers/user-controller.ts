import { Request, Response } from 'express';
import { UserModel } from '../models/user-model';

export function getUserList(req: Request, res: Response) {
  res.send('List of all users! :-)');
}
