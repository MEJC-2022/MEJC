import { Request, Response } from 'express';
import { OrderModel } from '../models/order-model';

export async function createOrder(req: Request, res: Response) {
  console.log('reached createOrder');
  const address = req.body.address;
  const products = req.body.orderItems;
  let haveArchivedProduct = false;
  const userId = '5f9d3b3b9d3b3b9d3b9d3b9d';

  // Check if product is archived not depending on req
  // but in the database instead?
  // products.forEach((product) => {
  //   if (product.isArchived) {
  //     haveArchivedProduct = true;
  //   }
  // });

  if (haveArchivedProduct) {
    res.status(400).send({
      message: 'One of the products you have in your cart is archived.',
    });
    return;
  }
  const completOrder = {
    orderId: '123884954589',
    userId: userId,
    deliveryAddress: address,
    orderItems: products,
    createdAt: new Date(),
    isShipped: false,
    totalPrice: 0,
  };

  const result = await OrderModel.create(completOrder);

  res.status(200).send({
    message: 'Order created successfully.',
  });

  // console.log(address);
  // console.log(products);
  // Validate the request body

  // Create the order

  // Return the order
}
