import express from 'express';
import {
  createCategory,
  deleteCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
} from '../controllers/category-controller';
import {
  validateCategoryId,
  validateCategoryTitle,
} from '../validations/category-validation';

const categoryRouter = express.Router();

categoryRouter.post('/api/categories', validateCategoryTitle, createCategory);
categoryRouter.get('/api/categories', getAllCategories);
categoryRouter.get('/api/categories/:id', getCategoryById);
categoryRouter.put('/api/categories/:id', validateCategoryId, updateCategory);
categoryRouter.delete('/api/categories/:id', validateCategoryId, deleteCategory);

export default categoryRouter;
