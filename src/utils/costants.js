import { enumType, asNexusMethod } from '@nexus/schema'

import { GraphQLDate, GraphQLDateTime } from 'graphql-iso-date'
import { GraphQLScalarType } from 'graphql'

export const isDev = () => process.env.NODE_ENV === 'development'

export const DateTime = GraphQLDateTime

export const GQLDate = asNexusMethod(GraphQLDate, 'date', 'Date')

export const SexType = enumType({
  name: 'Sex',
  description: 'The sex of the user',
  members: ['male', 'female', 'unknown'],
})

export const WorkoutType = enumType({
  name: 'Typology',
  description: 'The workout typology',
  members: ['online', 'outdoor'],
})

export const JSONScalar = new GraphQLScalarType({
  name: 'JSON',
  serialize: (data) => data,
  parseValue: (data) => data,
})

export const tokenTypeConfirmation = 'confirmation'
export const tokenTypeReset = 'reset'
