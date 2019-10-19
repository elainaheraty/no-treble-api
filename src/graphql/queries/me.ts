import { prismaQueryField } from '../../util/nexus';

export const Me = prismaQueryField('me', {
  type: 'User',
  nullable: true,
  resolve: (_parent, _args, ctx) => ctx.prisma.user({ id: ctx.user.id })
});
