// user-router.ts
import { Router } from 'express';
import { getUserList } from '../controllers/user-controller';

const userRouter = Router().get('/api/users', getUserList);

export default userRouter;
