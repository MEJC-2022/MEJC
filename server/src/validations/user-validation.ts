import { NextFunction, Request, Response } from 'express';
import * as yup from 'yup';

export const userValidationSchema = yup.object({
  email: yup.string().email().required(),
  password: yup.string().min(8).required(),
});

export async function validateUser(req: Request, res: Response, next: NextFunction) {
  try {
    const user = await userValidationSchema.validate(req.body);
    next();
  } catch (error) {
    res.status(401).json(error.message);
  }
}
