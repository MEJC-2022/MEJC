import { NextFunction, Request, Response } from 'express';
import * as Yup from 'yup';

export const addressSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, 'First name should have at least 2 letters')
    .required('This field is required firstname'),
  lastName: Yup.string()
    .min(2, 'Last name should have at least 2 letters')
    .required('This field is required lastname'),
  email: Yup.string()
    .email('Invalid email')
    .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Invalid email')
    .required('Email is required'),
  street: Yup.string()
    .min(2, 'Your street address should have at least 2 letters')
    .required('This field is required street'),
  city: Yup.string()
    .min(2, 'Name should have at least 2 letters')
    .max(50, 'This field is too big')
    .required('This field is required city'),
  zipCode: Yup.string()
    .min(5, 'this field should be 5 numbers long')
    .max(5, 'this field should be 5 numbers long')
    .required('This field is required zipcode'),
  phoneNumber: Yup.string()
    .min(10, 'Your phone number should be 10 numbers long')
    .max(10, 'Your phone number should be 10 numbers long')
    .required('This field is required phoneNumber'),
});

export const orderItemSchema = Yup.array().of(
  Yup.object().shape({
    _id: Yup.string().required('This field is required'),
    quantity: Yup.number()
      .min(1, 'Quantity should be at least 1')
      .required('This field is required'),
  }),
);

export const userIdSchema = Yup.string().required();
export const orderIdSchema = Yup.string().required();

export async function validateOrder(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { address, orderItems, userId } = req.body;
  await addressSchema.validate(address);
  await orderItemSchema.validate(orderItems);
  await userIdSchema.validate(userId);
  next();
}

export async function validateOrderId(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  console.log(req.params.id);
  await orderIdSchema.validate(req.params.id);
  next();
}
