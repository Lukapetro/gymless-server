import { enumType, asNexusMethod } from '@nexus/schema'

import { GraphQLDate, GraphQLDateTime } from 'graphql-iso-date'

export const tokens = {
  access: {
    name: 'ACCESS_TOKEN',
    expiry: '1d',
  },
}

export const isDev = () => process.env.NODE_ENV === 'development'

export const DateTime = GraphQLDateTime

export const GQLDate = asNexusMethod(GraphQLDate, 'date', 'Date')

export const SexType = enumType({
  name: 'Sex',
  description: 'The sex of the user',
  members: ['male', 'female', 'unknown'],
})
