import { ApolloServer } from 'apollo-server'

import { prisma } from './generated/prisma-client'
import schema from './schema'

const server = new ApolloServer({
  schema,
  context: request => ({
    ...request,
    prisma
  })
});

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
