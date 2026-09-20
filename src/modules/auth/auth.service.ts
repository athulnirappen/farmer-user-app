import { Prisma } from '@prisma/client';
import { AppError } from '../../shared/errors/app-error.js';
import { generateToken } from '../../shared/utils/jwt.js';
import { comparePassword, hashPassword } from '../../shared/utils/password.js';
import { AdminLoginInput, AdminRegisterInput } from './auth.schemas.js';
import { createAdmin, findUserByEmail } from './auth.repository.js';

const toAuthResponse = (user: {
  id: string;
  name: string;
  email: string;
  role: 'ADMIN' | 'USER';
}) => ({
  user: {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
  },
  accessToken: generateToken({ sub: user.id, role: user.role }),
});

export const registerAdmin = async (input: AdminRegisterInput) => {
  const existingUser = await findUserByEmail(input.email);

  if (existingUser) {
    throw new AppError('Email is already registered', 409);
  }

  try {
    const user = await createAdmin({
      name: input.name,
      email: input.email,
      passwordHash: await hashPassword(input.password),
    });

    return toAuthResponse(user);
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
      throw new AppError('Email is already registered', 409);
    }
    throw error;
  }
};

export const loginAdmin = async (input: AdminLoginInput) => {
  const user = await findUserByEmail(input.email);

  if (!user || user.role !== 'ADMIN' || !user.isActive) {
    throw new AppError('Invalid admin credentials', 401);
  }

  const passwordMatches = await comparePassword(input.password, user.passwordHash);

  if (!passwordMatches) {
    throw new AppError('Invalid admin credentials', 401);
  }

  return toAuthResponse(user);
};