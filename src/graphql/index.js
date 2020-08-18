import { Query } from './queries'
import { Mutation } from './mutations'
import { User } from './models/User'
import { AuthPayload } from './models/AuthPayload'
import { Cordinates } from './models/Cordinates'
import { Workout } from './models/Workout'

export const resolvers = [
  Query,
  Mutation,
  User,
  AuthPayload,
  Cordinates,
  Workout,
]
