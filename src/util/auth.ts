import { Request } from 'express';
import { sign, verify } from 'jsonwebtoken';

import { User, prisma } from '../generated/prisma-client';

export const APP_SECRET = 'appsecret321';

interface Token {
  userId: string;
}

export interface AuthPayload {
  token: string;
  user: User;
}

const getUserId = (req: Request) => {
  const Authorization = req.get('Authorization');
  if (Authorization) {
    const token = Authorization.replace('Bearer ', '');
    const verifiedToken = verify(token, APP_SECRET) as Token;
    return verifiedToken && verifiedToken.userId;
  }
  return undefined;
};

export const getAuthPayload = (user: User): AuthPayload => ({
  user,
  token: sign({ userId: user.id }, APP_SECRET)
});

export const getUser = async (req: Request) => {
  const id = getUserId(req);
  return id && prisma.user({ id });
};
