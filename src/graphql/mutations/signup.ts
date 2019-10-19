import { hash } from 'bcrypt';
import { pipe } from 'fp-ts/lib/pipeable';
import { mutationField, stringArg } from 'nexus';

import { getAuthPayload } from '../../util/auth';

export const Signup = mutationField('signup', {
  type: 'AuthPayload',
  args: {
    email: stringArg(),
    name: stringArg(),
    password: stringArg()
  },
  resolve: async (_, { email, name, password: passwordPlainText }, ctx) =>
    pipe(
      await hash(passwordPlainText, 10),
      password =>
        ctx.prisma
          .createUser({
            email,
            name,
            password
          })
          .then(getAuthPayload)
    )
});
