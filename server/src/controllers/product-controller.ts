import { Request, Response } from 'express';
import { ProductModel } from '../models/product-model';

const createProduct = async (req: Request, res: Response) => {
  const product = new ProductModel(req.body);
  const savedProduct = await product.save();
  res.json(savedProduct);
};

const getAllProducts = async (req: Request, res: Response) => {
  const products = await ProductModel.find();
  res.json(products);
};

export { createProduct, getAllProducts };
