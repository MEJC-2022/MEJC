import { Request, Response } from 'express';
import { UserModel } from '../models/user-model';

export async function getUserList(req: Request, res: Response) {
  const users = await UserModel.find({});
  res.json(users);
}

export async function registerUser(req: Request, res: Response) {
  const user = await UserModel.create(req.body);
  res.status(201).json(user);
}
