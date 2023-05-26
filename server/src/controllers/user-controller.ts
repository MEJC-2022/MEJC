import argon2 from 'argon2';
import { Request, Response } from 'express';
import { UserModel } from '../models/user-model';

// export async function getUserList(req: Request, res: Response) {
//   const userList = await UserModel.find({});
//   res.status(200).json(userList);
// }

// export function getLoggedInUser(req: Request, res: Response) {
//   // Checks if user is logged in
//   console.log(req.session);
//   if (!req.session || !req.session.user) {
//     throw new APIError('You must login', 401);
//   }
//   res.status(200).json(req.session?.user);
// }

export async function getUserList(req: Request, res: Response) {
  try {
    const userList = await UserModel.find({});
    res.status(200).json(userList);
  } catch (err) {
    console.error('User list could not be retrieved:\n', err);
    res.status(500).json({ error: 'User list could not be retrieved' });
  }
}

export function getLoggedInUser(req: Request, res: Response) {
  // Checks if user is logged in
  try {
    if (!req.session || !req.session.user) {
      return res.status(204).end();
    }
    res.status(200).json(req.session?.user);
  } catch (err) {
    console.error('User authentication could not be verified:\n', err);
    res
      .status(500)
      .json({ error: 'User authentication could not be verified' });
  }
}

export async function registerUser(req: Request, res: Response) {
  try {
    const user = await UserModel.create(req.body);
    res
      .status(201)
      .json({ message: 'A new user has been created', user: user });
  } catch (err) {
    console.error('User could not be created:\n', err);
    res.status(500).json({ error: 'User could not be created' });
  }
}

export async function loginUser(req: Request, res: Response) {
  const { email, password } = req.body;

  try {
    // Checks if user is already logged in
    if (req.session && req.session.user) {
      res.status(409).json({
        error: 'User is already logged in',
        currentSession: req.session.user,
      });
      return;
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
    }
  } catch (err) {
    console.error('An error trying to login has occured:\n', err);
    res.status(500).json({ error: 'An error trying to login has occurred' });
  }
}

export async function logoutUser(req: Request, res: Response) {
  try {
    if (req.session && Object.keys(req.session).length !== 0) {
      req.session = null;
      res.status(204).send('You have successfully logged out');
    } else {
      res.status(401).send({ error: 'You are already logged out' });
    }
  } catch (err) {
    console.error('An error has occurred during user logout:\n', err);
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
      .status(200)
      .json({ message: 'The role for user has been changed', user: user });
  } catch (err) {
    console.error('An error has occurred during user role update:\n', err);
    res
      .status(500)
      .json({ error: 'An error has occurred during user role update' });
  }
}
