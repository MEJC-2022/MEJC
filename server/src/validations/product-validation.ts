import { NextFunction, Request, Response } from 'express';
import * as Yup from 'yup';

const categorySchema = Yup.object().shape({
  _id: Yup.string().required('Category ID is required'),
  title: Yup.string().required('Category title is required'),
});

const productSchema = Yup.object().shape({
  categories: Yup.array()
    .of(categorySchema)
    .required('At least one category is required')
    .min(1, 'At least one category is required'),
  image: Yup.string().required('Image is required'),
  title: Yup.string()
    .min(2, 'Title should have at least 2 letters')
    .required('Title is required'),
  description: Yup.string()
    .min(5, 'Description should have at least 5 letters')
    .required('Description is required'),
  price: Yup.number()
    .min(1, 'Nothing is this cheap...')
    .required('Price is required')
    .strict(),
  stock: Yup.number()
    .min(0, 'Stock cannot be negative')
    .required('Stock is required')
    .typeError('Stock must be a number')
    .integer('Stock must be an integer'),
});

export const productIdSchema = Yup.string().required();

export async function validateProduct(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  console.log(req.body);
  await productSchema.validate(req.body);
  next();
}

export async function validateProductId(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  await productIdSchema.validate(req.params.id);
  next();
}
