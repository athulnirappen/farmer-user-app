import { Router } from 'express';
import { validate } from '../../../middleware/validate.middleware.js';
import {
  loginAdminController,
  registerAdminController,
} from './admin.controller.js';
import { adminLoginSchema, adminRegisterSchema } from './admin.schemas.js';

const adminAuthRouter = Router();

adminAuthRouter.post('/register', validate(adminRegisterSchema), registerAdminController);
adminAuthRouter.post('/login', validate(adminLoginSchema), loginAdminController);

export default adminAuthRouter;