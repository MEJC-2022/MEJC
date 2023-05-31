// user-router.ts
import { Router } from 'express';
import {
  getUserList,
  loginUser,
  logoutUser,
  registerUser,
  updateUserRole,
} from '../controllers/user-controller';
import { checkSession, isAdmin } from '../middlewares/auth-checks';
import { validateUser, validateUserForm } from '../validations/user-validation';

const userRouter = Router()
  .get('/api/users', isAdmin, getUserList)
  .get('/api/users/authentication', checkSession)
  .post('/api/users/register', validateUserForm, registerUser)
  .post('/api/users/login', validateUserForm, loginUser)
  .post('/api/users/logout', logoutUser)
  .put('/api/users/:id', isAdmin, validateUser, updateUserRole);
// patch istället för put?

export default userRouter;
