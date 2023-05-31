import express from 'express';
import {
  createCategory,
  deleteCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
} from '../controllers/category-controller';
import { isAdmin } from '../middlewares/auth-checks';
import {
  validateCategoryId,
  validateCategoryTitle,
} from '../validations/category-validation';

const categoryRouter = express.Router();

categoryRouter.post(
  '/api/categories',
  isAdmin,
  validateCategoryTitle,
  createCategory,
);
categoryRouter.get('/api/categories', getAllCategories);
categoryRouter.get('/api/categories/:id', getCategoryById);
categoryRouter.put('/api/categories/:id', isAdmin, validateCategoryId, updateCategory);
categoryRouter.delete(
  '/api/categories/:id',
  isAdmin,
  validateCategoryId,
  deleteCategory,
);

export default categoryRouter;
