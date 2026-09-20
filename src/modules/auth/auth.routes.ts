import { Router } from 'express';
import { validate } from '../../middleware/validate.middleware.js';
import {
  loginAdminController,
  registerAdminController,
} from './auth.controller.js';
import { adminLoginSchema, adminRegisterSchema } from './auth.schemas.js';

const authRouter = Router();

authRouter.post('/admin/register', validate(adminRegisterSchema), registerAdminController);
authRouter.post('/admin/login', validate(adminLoginSchema), loginAdminController);

export default authRouter;