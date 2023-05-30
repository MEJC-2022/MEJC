import express from 'express';
import {
  deleteFileById,
  getFileById,
  uploadFile,
} from '../controllers/file-controller';
import { isAdmin } from '../middlewares/auth-checks';
import { validateFile } from '../validations/file-validation';

const fileRouter = express.Router();

fileRouter.get('/api/file/:id', getFileById);
fileRouter.post('/api/file', isAdmin, validateFile, uploadFile);
fileRouter.delete('/api/file/:id', isAdmin, deleteFileById);

export default fileRouter;
