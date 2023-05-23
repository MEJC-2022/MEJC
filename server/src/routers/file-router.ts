import express from 'express';
import {
  deleteFileById,
  getFileById,
  uploadFile,
} from '../controllers/file-controller';

const fileRouter = express.Router();

fileRouter.get('/api/file/:id', getFileById);
fileRouter.post('/api/file', uploadFile);
fileRouter.delete('/api/file/:id', deleteFileById);

export default fileRouter;
