// user-router.ts
import { Router } from 'express';
import {
  getLoggedInUser,
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
  .get('/api/users/authentication', getLoggedInUser)
  .post('/api/users/register', validateUserForm, registerUser)
  .post('/api/users/login', validateUserForm, loginUser)
  .post('/api/users/logout', logoutUser) // ? Behövs validering? Troligtvis inte
  .put('/api/users/:id', isAdmin, validateUser, updateUserRole);

export default userRouter;
