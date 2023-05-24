// user-router.ts
import { Router } from 'express';
import {
  getUserList,
  loginUser,
  logoutUser,
  registerUser,
  updateUserRole,
} from '../controllers/user-controller';
import { isAdmin } from '../handlers/admin-handler';
import { validateUser, validateUserForm } from '../validations/user-validation';

const userRouter = Router()
  .get('/api/users', isAdmin, getUserList)
  .post('/api/users/register', validateUserForm, registerUser)
  .post('/api/users/login', validateUserForm, loginUser)
  .post('/api/users/logout', logoutUser) // ? Behövs validering? Troligtvis inte
  .put('/api/users/:id', isAdmin, validateUser, updateUserRole);

export default userRouter;
