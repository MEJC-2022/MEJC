import { NextFunction, Request, Response } from 'express';
import * as Yup from 'yup';

export const fileIdSchema = Yup.string().required();

export async function validateFile(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  // console.log(req.body, req.params, req.headers)
  // await fileIdSchema.validate(req.params.id);
  next();
}
