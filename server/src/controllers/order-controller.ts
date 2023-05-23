import { Request, Response } from 'express';
import { OrderModel } from '../models/order-model';
import { ProductModel } from '../models/product-model';
import { addressSchema } from '../validation/order-validation';

export async function createOrder(req: Request, res: Response) {
  const { address, orderItems } = req.body;

  const userId = '5f9d3b3b9d3b3b9d3b9d3b9d';
  let haveArchivedProduct = false;
  let productOutOfStock = false;
  let totalPrice = 0;

  orderItems.forEach(async (product) => {
    const productId = product._id;
    const singleProduct = await ProductModel.findById(productId);
    console.log('Gick igenom produkt:', productId);

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

  orderItems.forEach((product) => {
    totalPrice += product.price * product.quantity;
  });

  try {
    await addressSchema.validate(address);
    console.log('the address was validated');
  } catch (error) {
    console.log('the address was not validated');
    res.set('content-type', 'application/json');
    return res.status(400).json(JSON.stringify(error.message));
  }

  // Validate orderItems
  // Validate userID and quantity

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
  });
}
