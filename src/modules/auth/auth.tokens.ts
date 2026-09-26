import { env } from '../../config/env.js';
import { generateRefreshToken, hashRefreshToken } from '../../shared/utils/refresh-token.js';

export const createRefreshTokenMaterial = () => {
  const refreshToken = generateRefreshToken();

  return {
    refreshToken,
    refreshTokenHash: hashRefreshToken(refreshToken),
    refreshTokenExpiresAt: new Date(
      Date.now() + env.REFRESH_TOKEN_EXPIRES_IN_DAYS * 24 * 60 * 60 * 1000
    ),
  };
};