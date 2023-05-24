import argon2 from 'argon2';
import { Request, Response } from 'express';
import { UserModel } from '../models/user-model';

export async function getUserList(req: Request, res: Response) {
  try {
    const userList = await UserModel.find({});
    res.status(200).json({ userList });
  } catch (err) {
    console.error('User list could not be retrieved', err);
    res.status(500).json({ error: 'User list could not be retrieved' });
  }
}

export async function registerUser(req: Request, res: Response) {
  try {
    const user = await UserModel.create(req.body);
    res
      .status(201)
      .json({ message: 'A new user has been created', user: user });
  } catch (err) {
    console.error('User could not be created', err);
    res.status(500).json({ error: 'User could not be created' });
  }
}

export async function loginUser(req: Request, res: Response) {
  const { email, password } = req.body;

  try {
    // Finds user by email
    const user = await UserModel.findOne({ email }).select('+password');

    if (!user) {
      res.status(401).json('No registered account with this email exists');
      return;
    }

    // Verifies password
    const isPasswordValid = await argon2.verify(user.password, password);

    if (!isPasswordValid) {
      res.status(401).json('Password is incorrect');
      return;
    }

    // Creates cookie session for logged in user
    if (req.session) {
      req.session.user = {
        _id: user._id,
        email: user.email,
        isAdmin: user.isAdmin,
      };
      res
        .status(200)
        .json({
          message: 'A new session has been set',
          session: req.session.user,
        });
    }
  } catch (err) {
    console.error('An error trying to login has occured', err);
    res.status(500).json({ error: 'An error trying to login has occurred' });
  }
}

export async function logoutUser(req: Request, res: Response) {
  try {
    if (req.session && Object.keys(req.session).length !== 0) {
      req.session = null;
      res.status(204).send('You have successfully logged out');
    } else {
      res.status(401).send('User is already logged out');
    }
  } catch (err) {
    console.error('An error has occurred during user logout', err);
    res.status(500).json({ error: 'An error has occurred during user logout' });
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
    res
      .status(204)
      .json({ message: 'The role for user has been changed', user: user });
  } catch (err) {
    console.error('An error has occurred during user role update', err);
    res.status(500).json({ error: 'An error has occurred during user role update' });
  }
}
