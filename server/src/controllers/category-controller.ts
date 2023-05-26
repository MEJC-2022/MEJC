import { Request, Response } from 'express';
import { CategoryModel } from '../models/category-model';

async function createCategory(req: Request, res: Response) {
  const { title } = req.body;

  let category = await CategoryModel.findOne({ title });

  if (!category) {
    category = new CategoryModel({ title });
    await category.save();
    res.status(201).json(category);
  } else {
    res.status(400).send({ message: 'Category already exists' });
  }
}

const getAllCategories = async (req: Request, res: Response) => {
  const categories = await CategoryModel.find();
  res.json(categories);
};

const getCategoryById = async (req: Request, res: Response) => {
  const category = await CategoryModel.findById(req.params.id);
  if (category) {
    res.json(category);
  } else {
    res.status(404).send({ message: 'Category not found' });
  }
};

const updateCategory = async (req: Request, res: Response) => {
  const category = await CategoryModel.findById(req.params.id);
  if (category) {
    category.title = req.body.title;
    const updatedCategory = await category.save();
    res.json(updatedCategory);
  } else {
    res.status(404).send({ message: 'Category not found' });
  }
};

const deleteCategory = async (req: Request, res: Response) => {
  const category = await CategoryModel.findById(req.params.id);
  if (category) {
    await category.deleteOne();
    res.send({ message: 'Category deleted' });
  } else {
    res.status(404).send({ message: 'Category not found' });
  }
};

export {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
};
