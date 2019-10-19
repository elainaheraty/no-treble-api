import { ApolloServer } from 'apollo-server';

import { prisma } from './generated/prisma-client';
import schema from './schema';
import { getUser } from './util/auth';

const server = new ApolloServer({
  schema,
  context: async ({ req }) => ({
    user: await getUser(req),
    prisma
  })
});

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
