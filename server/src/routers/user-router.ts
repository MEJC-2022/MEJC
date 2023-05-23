// user-router.ts
import { Router } from 'express';
import {
  getUserList,
  loginUser,
  logoutUser,
  registerUser,
} from '../controllers/user-controller';

const userRouter = Router()
  .get('/api/users', getUserList)
  .post('/api/users/register', registerUser)
  .post('/api/users/login', loginUser)
  .post('/api/users/logout', logoutUser);

export default userRouter;
