// user-router.ts
import { Router } from 'express';
import {
  getUserList,
  loginUser,
  logoutUser,
  registerUser,
  updateUserRole,
} from '../controllers/user-controller';
import { validateUser } from '../validations/user-validation';
import { isAdmin } from '../handlers/admin-handler';

const userRouter = Router()
  .get('/api/users', getUserList)
  .post('/api/users/register', validateUser, registerUser)
  .post('/api/users/login', validateUser, loginUser)
  .post('/api/users/logout', logoutUser) // Behövs denna?
  .put('/api/users/:id', isAdmin, updateUserRole);

export default userRouter;
