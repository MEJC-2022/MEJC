import { NextFunction, Request, Response } from 'express';
import * as yup from 'yup';

export const userFormSchema = yup.object({
  email: yup.string().email().required(),
  password: yup.string().min(8).required(),
});

export const userSchema = yup.object({
  _id: yup.string().required(),
  email: yup.string().required(),
  isAdmin: yup.boolean().required(),
  createdAt: yup.string().required(),
});

export async function validateUserForm(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    await userFormSchema.validate(req.body);
    next();
  } catch (err) {
    console.error(
      'A validation error has occurred during user creation or login:\n',
      err,
    );
    res.status(400).json({
      error: 'A validation error has occurred during user creation or login',
    });
  }
}

export async function validateUser(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    await userSchema.validate(req.body);
    next();
  } catch (err) {
    console.error(
      'A validation error has occurred during user role update:\n',
      err,
    );
    res.status(400).json({
      error: 'A validation error has occurred during user role update',
    });
  }
}
