import { createHash, randomBytes } from 'node:crypto';

export const generateRefreshToken = (): string => randomBytes(64).toString('base64url');

export const hashRefreshToken = (token: string): string =>
  createHash('sha256').update(token).digest('hex');