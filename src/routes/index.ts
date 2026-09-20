import { Router, Request, Response } from 'express';
import authRouter from '../modules/auth/auth.routes.js';

const router = Router();

router.use('/auth', authRouter);

/**
 * @route GET /health
 * @desc Basic health check endpoint
 */
router.get('/health', (req: Request, res: Response) => {
  res.status(200).json({
    status: 'UP',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

export default router;
