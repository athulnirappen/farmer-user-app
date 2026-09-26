import { Router } from 'express';
import adminAuthRouter from './admin/admin.routes.js';
import userAuthRouter from './user/user.routes.js';

const authRouter = Router();

authRouter.use('/admin', adminAuthRouter);
authRouter.use('/user', userAuthRouter);

export default authRouter;