import argon2 from 'argon2';
import { Request, Response } from 'express';
import { UserModel } from '../models/user-model';

export async function getUserList(req: Request, res: Response) {
  try {
    const userList = await UserModel.find({});
    if (!userList) {
      throw new Error('User list could not be retrieved');
    } else {
      res.status(200).json(userList);
    }
  } catch (err) {
    console.error(err);
  }
}

export async function registerUser(req: Request, res: Response) {
  try {
    const user = await UserModel.create(req.body);
    res.status(201).json(user);
  } catch (err) {
    console.error(err);
  }
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

export async function logoutUser(req: Request, res: Response) {
  try {
    if (req.session && Object.keys(req.session).length !== 0) {
      req.session = null;
      res.status(204).send('You have successfully logged out.');
    } else {
      res.status(401).send('User already logged out.');
    }
  } catch (err) {
    console.error(err);
  }
}

export async function updateUserRole(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const { isAdmin } = req.body;
    const user = await UserModel.findByIdAndUpdate(
      id,
      { isAdmin },
      { new: true },
    );
    res.status(200).json(user);
  } catch (err) {
    console.error(err);
  }
}
