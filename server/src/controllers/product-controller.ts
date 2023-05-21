import { Request, Response } from 'express';
import { ProductModel } from '../models/product-model';

const addProduct = async (req: Request, res: Response) => {
  const product = new ProductModel(req.body);
  const savedProduct = await product.save();
  res.json(savedProduct);
};

export { addProduct };
