import { getAuthPayload } from '../../util/auth';
import { hash } from 'bcrypt';
import { mutationField } from 'nexus';
import { pipe } from 'fp-ts/lib/pipeable';
import { stringArg } from 'nexus';

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
