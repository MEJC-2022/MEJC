// user-router.ts
import { Router } from 'express';
import {
  getUserList,
  loginUser,
  logoutUser,
  registerUser,
} from '../controllers/user-controller';
import { validateUser } from '../validations/user-validation';

const userRouter = Router()
  .get('/api/users', getUserList)
  .post('/api/users/register', validateUser, registerUser)
  .post('/api/users/login', validateUser, loginUser)
  .post('/api/users/logout', logoutUser); // Behövs validering?

export default userRouter;
