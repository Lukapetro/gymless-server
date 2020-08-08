const { nexusPrismaPlugin } = require('nexus-prisma')
const { makeSchema, objectType } = require('@nexus/schema')
import { Query } from './graphql/Query'
import { Mutation } from './graphql/Mutation'
import { User } from './graphql/models/User'
import { AuthPayload } from './graphql/models/AuthPayload'
import { Workout } from './graphql/models/Workout'
import { Trainer } from './graphql/models/Trainer'

const schema = makeSchema({
  types: [Query, Mutation, AuthPayload, User, Workout],
  plugins: [nexusPrismaPlugin()],
  outputs: {
    schema: __dirname + '/../schema.graphql',
    typegen: __dirname + '/generated/nexus.ts',
  },
  typegenAutoConfig: {
    contextType: 'Context.Context',
    sources: [
      {
        source: '@prisma/client',
        alias: 'prisma',
      },
      {
        source: require.resolve('./context'),
        alias: 'Context',
      },
    ],
  },
})

module.exports = {
  schema,
}
