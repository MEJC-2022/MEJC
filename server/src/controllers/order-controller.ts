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

export async function getAllOrders(req: Request, res: Response) {
  try {
    const orders = await OrderModel.find();

    if (orders.length === 0 || orders === null) {
      return res.status(404).send({
        message: 'No orders found.',
      });
    }

    res.status(200).send({
      message: 'All orders fetched successfully.',
      orders,
    });
  } catch (error) {
    res.status(500).send({
      message: 'Something went wrong with getting orders.',
    });
  }
}

export async function getOrderById(req: Request, res: Response) {
  const incomingOrderId = req.params.id;
  const session = req.session;

  if (!session || !session.user || !session.user._id) {
    console.log('not logged in');
    return res.status(401).send({
      message: 'You are not logged in.',
    });
  }

  try {
    const fetchedOrder = await OrderModel.findById(incomingOrderId);

    if (!fetchedOrder) {
      return res.status(404).send({
        message: 'Order not found.',
      });
    } else if (
      session.user.isAdmin ||
      session.user._id === fetchedOrder.userId
    ) {
      return res.status(200).send({
        message: 'Order fetched successfully.',
        fetchedOrder,
      });
    }
  } catch (error) {
    return res.status(500).send({
      message: 'Something went wrong with getting order.',
    });
  }
}

export async function getOrdersByUserId(req: Request, res: Response) {
  const session = req.session;
  const incomingUserId = req.params.id;

  if (!session || !session.user || !session.user._id) {
    console.log('not logged in');
    return res.status(401).send({
      message: 'You are not logged in.',
    });
  }

  if (!session.user.isAdmin || session.user._id == !incomingUserId) {
    console.log('not admin or not the same user');
    return res.status(401).send({
      message: 'You are not authorized to see this order.',
    });
  }

  try {
    const fetchedListOfOrders = await OrderModel.find({
      userId: incomingUserId,
    });

    if (!fetchedListOfOrders) {
      return res.status(404).send({
        message: 'No orders found.',
      });
    } else if (session.user.isAdmin || session.user._id === incomingUserId) {
      return res.status(200).send({
        message: 'All orders fetched successfully.',
        fetchedListOfOrders,
      });
    }
  } catch (error) {
    return res.status(500).send({
      message: 'Something went wrong with getting order.',
    });
  }
}

export async function shipOrder(req: Request, res: Response) {
  // TODO: Add admin auth on the route
  const incomingOrderId = req.params.id;

  const fetchedOrder = await OrderModel.findById(incomingOrderId);

  if (!fetchedOrder) {
    return res.status(404).send({
      message: 'Order not found.',
    });
  }

  if (fetchedOrder.isShipped) {
    await OrderModel.findByIdAndUpdate(incomingOrderId, {
      isShipped: false,
    });
    res.status(200).send({
      message: 'Order has been unshipped.',
    });
  } else if (!fetchedOrder.isShipped) {
    await OrderModel.findByIdAndUpdate(incomingOrderId, {
      isShipped: true,
    });
    res.status(200).send({
      message: 'Order shipped successfully.',
    });
  }
}
