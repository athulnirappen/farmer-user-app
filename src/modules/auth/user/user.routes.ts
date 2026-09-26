import { Router } from 'express';
import rateLimit from 'express-rate-limit';
import { validate } from '../../../middleware/validate.middleware.js';
import {
	requestBuyerRegistrationOtpController,
	startUserAuthController,
	verifyBuyerLoginOtpController,
	verifyBuyerRegistrationOtpController,
} from './user.controller.js';
import {
	registerOtpSchema,
	startUserAuthSchema,
	verifyOtpSchema,
} from './user.schemas.js';

const userAuthRouter = Router();
const otpRateLimit = rateLimit({
	windowMs: 15 * 60 * 1000,
	limit: 10,
	standardHeaders: true,
	legacyHeaders: false,
	message: {
		status: 'error',
		statusCode: 429,
		message: 'Too many verification attempts; try again later.',
	},
});

userAuthRouter.post('/start', otpRateLimit, validate(startUserAuthSchema), startUserAuthController);
userAuthRouter.post(
	'/register/request-otp',
	otpRateLimit,
	validate(registerOtpSchema),
	requestBuyerRegistrationOtpController
);
userAuthRouter.post(
	'/register/verify-otp',
	otpRateLimit,
	validate(verifyOtpSchema),
	verifyBuyerRegistrationOtpController
);
userAuthRouter.post(
	'/login/verify-otp',
	otpRateLimit,
	validate(verifyOtpSchema),
	verifyBuyerLoginOtpController
);

export default userAuthRouter;