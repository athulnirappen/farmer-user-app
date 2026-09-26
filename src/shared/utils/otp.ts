import { createHmac, randomInt, timingSafeEqual } from 'node:crypto';
import { env } from '../../config/env.js';

export const generateOtpCode = (): string => randomInt(100_000, 1_000_000).toString();

export const hashOtpCode = (code: string): string =>
  createHmac('sha256', env.JWT_SECRET).update(`user-auth-otp:${code}`).digest('hex');

export const verifyOtpCode = (code: string, expectedHash: string): boolean => {
  const actual = Buffer.from(hashOtpCode(code), 'hex');
  const expected = Buffer.from(expectedHash, 'hex');
  return actual.length === expected.length && timingSafeEqual(actual, expected);
};