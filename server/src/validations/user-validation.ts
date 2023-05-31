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
  await userFormSchema.validate(req.body);
  next();
}

export async function validateUser(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  await userSchema.validate(req.body);
  next();
}
