import argon2 from 'argon2';
import { Request, Response } from 'express';
import { UserModel } from '../models/user-model';

export async function getUserList(req: Request, res: Response) {
  const users = await UserModel.find({});
  res.status(200).json(users);
}

export async function registerUser(req: Request, res: Response) {
  const user = await UserModel.create(req.body);
  res.status(201).json(user);
}

export async function loginUser(req: Request, res: Response) {
  const { email, password } = req.body;
  const user = await UserModel.findOne({ email }).select('+password');

  try {
    if (!user) {
      res.status(401).json('No registered account with this email exists');
      return;
    }

    const isPasswordValid = await argon2.verify(user.password, password);

    if (!isPasswordValid) {
      res.status(401).json('Password is incorrect');
      return;
    }

    if (!req.session) {
      throw new Error('Session not found');
    }

    // Creates cookie session for logged in user
    req.session.user = {
      _id: user._id,
      email: user.email,
      isAdmin: user.isAdmin,
    };

    res.status(200).json(req.session.user);
  } catch (err) {
    console.error(err);
  }
}
