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

const getProductById = async (req: Request, res: Response) => {
  const product = await ProductModel.findById(req.params.id);
  if (product) {
    res.json(product);
  } else {
    res.status(404).send({ message: 'Product not found' });
  }
};

const updateProduct = async (req: Request, res: Response) => {
  const product = await ProductModel.findById(req.params.id);
  if (product) {
    product.image = req.body.image;
    product.title = req.body.title;
    product.description = req.body.description;
    product.price = req.body.price;
    product.stock = req.body.stock;

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } else {
    res.status(404).send({ message: 'Product not found' });
  }
};

const deleteProduct = async (req: Request, res: Response) => {
  const product = await ProductModel.findById(req.params.id);
  if (product) {
    await product.deleteOne();
    res.send({ message: 'Product deleted' });
  } else {
    res.status(404).send({ message: 'Product not found' });
  }
};

export {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
