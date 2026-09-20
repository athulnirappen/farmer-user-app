import { User, UserRole } from '@prisma/client';
import { prisma } from '../../prisma/client.js';

export type AuthUser = Pick<User, 'id' | 'name' | 'email' | 'role' | 'isActive' | 'passwordHash'>;

export const findUserByEmail = (email: string): Promise<AuthUser | null> => {
  return prisma.user.findUnique({
    where: { email },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      isActive: true,
      passwordHash: true,
    },
  });
};

export const createAdmin = (data: {
  name: string;
  email: string;
  passwordHash: string;
}): Promise<AuthUser> => {
  return prisma.user.create({
    data: { ...data, role: UserRole.ADMIN },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      isActive: true,
      passwordHash: true,
    },
  });
};