import { Request, Response } from 'express';
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

  orderItems.forEach(async (product) => {
    const productId = product._id;
    const quantityOrdered = product.quantity;
    const singleProduct = await ProductModel.findById(productId);
    if (singleProduct === null) {
      return;
    }

    if (singleProduct.stock < quantityOrdered) {
      productOutOfStock = true;
    } else {
      singleProduct.stock = singleProduct.stock - quantityOrdered;
      await singleProduct.save();
    }
  });

  if (productOutOfStock) {
    res.status(409).send({
      message: 'One of the products you have in your cart is out of stock.',
    });
    return;
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

  const cleanedOrderItems = orderItems.map(({ _id, quantity }) => ({
    _id,
    quantity,
  }));

  console.log('cleanedOrderItems:', cleanedOrderItems);

  const completOrder = {
    userId: userId,
    deliveryAddress: address,
    orderItems: orderItems,
    isShipped: false,
    totalPrice: totalPrice,
  };

  // Validate completeOrder, address and products

  // const result = await OrderModel.create(completOrder);

  res.status(200).send({
    message: 'Order created successfully.',
  });
}
