// user-router.ts
import { Router } from 'express';
import { getUserList, registerUser } from '../controllers/user-controller';

const userRouter = Router()
  .get('/api/users', getUserList)
  .post('/api/users/register', registerUser);

export default userRouter;
