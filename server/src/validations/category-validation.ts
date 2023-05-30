import { NextFunction, Request, Response } from 'express';
import * as Yup from 'yup';

export const categorySchema = Yup.string().required();

export async function validateCategoryTitle(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { title } = req.body;
  await categorySchema.validate(title);
  next();
}

export async function validateCategoryId(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  await categorySchema.validate(req.params.id);
  next();
}
