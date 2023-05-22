import { Request, Response } from 'express';

export async function createOrder(req: Request, res: Response) {
  const address = req.body.address;
  const products = req.body.products;
  let haveArchivedProduct = false;

  products.forEach((product) => {
    if (product.isArchived) {
      haveArchivedProduct = true;
    }
  });

  if (haveArchivedProduct) {
    res.status(400).send({
      message: 'One of the products you have in your cart is archived.',
    });
    return;
  }
  res.status(200).send({
    message: 'Order created successfully.',
  });

  console.log(address);
  console.log(products);
  // Validate the request body

  // Create the order

  // Return the order
}
