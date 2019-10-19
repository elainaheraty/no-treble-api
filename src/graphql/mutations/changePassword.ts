import { AuthenticationError } from 'apollo-server-errors';
import { compare, hash } from 'bcrypt';
import { pipe } from 'fp-ts/lib/pipeable';
import { stringArg } from 'nexus';

import { getAuthPayload } from '../../util/auth';
import { prismaMutationField } from '../../util/nexus';

export const ChangePassword = prismaMutationField('changePassword', {
  type: 'AuthPayload',
  args: {
    newPassword: stringArg(),
    oldPassword: stringArg()
  },
  resolve: async (_, { newPassword, oldPassword }, ctx) => {
    if (!(await compare(oldPassword, ctx.user.password)))
      throw new AuthenticationError('Invalid Password');
    return pipe(
      await hash(newPassword, 10),
      password =>
        ctx.prisma
          .updateUser({
            where: { id: ctx.user.id },
            data: { password }
          })
          .then(getAuthPayload)
    );
  }
});
