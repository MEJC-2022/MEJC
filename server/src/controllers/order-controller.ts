import { Request, Response } from 'express';
import { IncomingOrderItem, OrderModel } from '../models/order-model';
import { ProductModel } from '../models/product-model';
import {
  addressSchema,
  orderItemSchema,
  userIdSchema,
} from '../validation/order-validation';

export async function createOrder(req: Request, res: Response) {
  const { address, orderItems, userId } = req.body;

  let haveArchivedProduct = false;
  let productOutOfStock = false;
  let totalPrice = 0;

  orderItems.forEach(async (product: IncomingOrderItem) => {
    const productId = product._id;
    const singleProduct = await ProductModel.findById(productId);

    if (singleProduct!.isArchived) {
      haveArchivedProduct = true;
    }
  });

  if (haveArchivedProduct) {
    res.status(409).send({
      message: 'One of the products you have in your cart is archived.',
    });
    return;
  }

  for (const product of orderItems) {
    const productId = product._id;
    const quantityOrdered = product.quantity;
    const singleProduct = await ProductModel.findById(productId);

    if (singleProduct === null || singleProduct.stock < quantityOrdered) {
      productOutOfStock = true;
      break;
    }
  }

  if (productOutOfStock) {
    res.status(409).send({
      message: 'One of the products you have in your cart is out of stock.',
    });
    return;
  }

  for (const product of orderItems) {
    const productId = product._id;
    const quantityOrdered = product.quantity;
    const singleProduct = await ProductModel.findById(productId);

    singleProduct!.stock = singleProduct!.stock - quantityOrdered;
    await singleProduct!.save();
  }

  orderItems.forEach((product: IncomingOrderItem) => {
    totalPrice += product.price * product.quantity;
  });

  // Address validation
  try {
    await addressSchema.validate(address);
  } catch (error) {
    res.set('content-type', 'application/json');
    return res
      .status(400)
      .json(JSON.stringify('Your address is not in the correct format.'));
  }

  // OrderItem validation
  try {
    await orderItemSchema.validate(orderItems);
  } catch (error) {
    res.set('content-type', 'application/json');
    return res
      .status(400)
      .json(JSON.stringify('Something wrong with the products in your order.'));
  }

  // UserId validation
  try {
    await userIdSchema.validate(userId);
  } catch (error) {
    res.set('content-type', 'application/json');
    return res
      .status(400)
      .json(JSON.stringify('Something wrong with your user id.'));
  }

  const completOrder = {
    userId: userId,
    deliveryAddress: address,
    orderItems: orderItems,
    isShipped: false,
    totalPrice: totalPrice,
  };

  const result = await OrderModel.create(completOrder);

  res.status(200).send({
    message: 'Order created successfully.',
    result,
  });
}
