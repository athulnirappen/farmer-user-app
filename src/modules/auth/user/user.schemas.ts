import { z } from 'zod';

const phone = z.string().trim().regex(/^\+[1-9]\d{7,14}$/, 'Phone must be in E.164 format');

const requestSchema = <T extends z.ZodType>(body: T) => z.object({
  body,
  query: z.object({}),
  params: z.object({}),
});

export const startUserAuthSchema = requestSchema(z.object({ phone }));

export const registerOtpSchema = requestSchema(z.object({
  phone,
  name: z.string().trim().min(2).max(100),
  email: z.string().trim().email().toLowerCase(),
}));

export const verifyOtpSchema = requestSchema(z.object({
  phone,
  code: z.string().regex(/^\d{6}$/),
}));

export type StartUserAuthInput = z.infer<typeof startUserAuthSchema>['body'];
export type RegisterOtpInput = z.infer<typeof registerOtpSchema>['body'];
export type VerifyOtpInput = z.infer<typeof verifyOtpSchema>['body'];