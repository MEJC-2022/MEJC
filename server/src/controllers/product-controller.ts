import { Request, Response } from 'express';
import { APIError } from '../error-handlers/error-classes/api-error';
import { ProductModel } from '../models/product-model';

const createProduct = async (req: Request, res: Response) => {
  const product = new ProductModel(req.body);
  const savedProduct = await product.save();
  res.json(savedProduct);
};

const getAllCreatedProducts = async (req: Request, res: Response) => {
  const products = await ProductModel.find();
  res.json(products);
};

const getAllProducts = async (req: Request, res: Response) => {
  const products = await ProductModel.find({
    isArchived: { $in: [false, null] },
  }).populate('categories');
  res.json(products);
};

const getProductById = async (req: Request, res: Response) => {
  const product = await ProductModel.findById(req.params.id);
  if (product) {
    res.json(product);
  } else {
    throw new APIError(404, 'Product not found');
  }
};

const updateProduct = async (req: Request, res: Response) => {
  const product = await ProductModel.findById(req.params.id);
  if (product) {
    product.isArchived = true;
    await product.save();

    const newProductDetails = {
      title: req.body.title,
      categories: req.body.categories,
      image: req.body.image,
      description: req.body.description,
      price: req.body.price,
      stock: req.body.stock,
      isArchived: false,
    };
    const newProduct = new ProductModel(newProductDetails);
    await newProduct.save();

    res.json(newProduct);
  } else {
    throw new APIError(404, 'Product not found');
  }
};

const deleteProduct = async (req: Request, res: Response) => {
  const product = await ProductModel.findById(req.params.id);
  if (product) {
    product.isArchived = true;
    await product.save();
    res.send({ message: 'Product archived' });
  } else {
    throw new APIError(404, 'Product not found');
  }
};

export {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  getAllCreatedProducts,
};
