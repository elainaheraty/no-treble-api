import { AuthenticationError } from 'apollo-server-errors';
import { compare } from 'bcrypt';
import { mutationField, stringArg } from 'nexus';

import { getAuthPayload } from '../../util/auth';

export const Login = mutationField('login', {
  type: 'AuthPayload',
  args: {
    email: stringArg({ nullable: true }),
    password: stringArg()
  },
  resolve: async (_, { password, ...where }, ctx) => {
    const user = await ctx.prisma.user(where);
    if (!user) throw new AuthenticationError('No user found');
    if (!(await compare(password, user.password)))
      throw new AuthenticationError('Invalid Password');
    return getAuthPayload(user);
  }
});
