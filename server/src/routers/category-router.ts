import express from 'express';
import {
  createCategory,
  deleteCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
} from '../controllers/category-controller';

const categoryRouter = express.Router();

categoryRouter.post('/api/categories', createCategory);
categoryRouter.get('/api/categories', getAllCategories);
categoryRouter.get('/api/categories/:id', getCategoryById);
categoryRouter.put('/api/categories/:id', updateCategory);
categoryRouter.delete('/api/categories/:id', deleteCategory);

export default categoryRouter;
