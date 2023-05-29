import argon2 from 'argon2';
import { Request, Response } from 'express';
import { SessionError } from '../error-handlers/error-classes/session-error';
import { UserError } from '../error-handlers/error-classes/user-error';
import { UserModel } from '../models/user-model';

export async function getUserList(req: Request, res: Response) {
  const userList = await UserModel.find({});
  res.status(200).json(userList);
}

export function getLoggedInUser(req: Request, res: Response) {
  // Checks if user is logged in
  if (!req.session || !req.session.user) {
    // TODO: create different middlewares for just "checking" and for actually verifying and throwing errors
    return res.status(204).end();
  }
  res.status(200).json(req.session?.user);
}

export async function registerUser(req: Request, res: Response) {
  const user = await UserModel.create(req.body);
  res.status(201).json({ message: 'A new user has been created', user: user });
}

export async function loginUser(req: Request, res: Response) {
  const { email, password } = req.body;

  // Checks if user is already logged in
  if (req.session && req.session.user) {
    throw new SessionError(409, 'User is already logged in', req.session.user);
  }

  // Finds user by email
  const user = await UserModel.findOne({ email }).select('+password');
  if (!user) {
    res
      .status(404)
      .json(
        `No registered account with this email exists. Please make sure you spelled your email correctly`,
      );
    return;
  }

  // Verifies password
  const isPasswordValid = await argon2.verify(user.password, password);
  if (!isPasswordValid) {
    res
      .status(401)
      .json(
        'The password is incorrect. Make sure you spelled your password correctly',
      );
    return;
  }

  // Creates cookie session for logged in user
  if (req.session) {
    req.session.user = {
      _id: user._id,
      email: user.email,
      isAdmin: user.isAdmin,
    };
    res.status(200).json({
      message: 'A new session has been set',
      session: req.session.user,
    });
  } else {
    throw new SessionError(500, 'A new session could not be set');
  }
}

export async function logoutUser(req: Request, res: Response) {
  if (req.session && Object.keys(req.session).length !== 0) {
    req.session = null;
    res.status(204).send('You have successfully logged out');
  } else {
    throw new SessionError(401, 'You are already logged out');
  }
}

export async function updateUserRole(req: Request, res: Response) {
  const { id } = req.params;
  const { isAdmin } = req.body;
  const user = await UserModel.findByIdAndUpdate(
    id,
    { isAdmin },
    { new: true },
  );
  if (!user) {
    throw new UserError(401, 'User was not found');
  }
  res
    .status(200)
    .json({ message: 'The role for user has been changed', user: user });
}
