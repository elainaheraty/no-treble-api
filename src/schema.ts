import { makePrismaSchema } from 'nexus-prisma'
import { join } from 'path'

import datamodelInfo from './generated/nexus-prisma'
import { prisma } from './generated/prisma-client'
import * as types from './graphql'

const schema = makePrismaSchema({
  types,
  prisma: {
    datamodelInfo,
    client: prisma
  },
  typegenAutoConfig: {
    sources: [
      {
        alias: 'ctx',
        source: join(__dirname, 'context.ts')
      }
    ],
    contextType: 'ctx.Context'
  },
  shouldGenerateArtifacts: process.env.NODE_ENV === 'development',
  outputs: {
    schema: join(__dirname, './generated/schema.graphql'),
    typegen: join(__dirname, './generated/nexus.ts')
  },
  nonNullDefaults: {
    input: true
  }
});

export default schema;
