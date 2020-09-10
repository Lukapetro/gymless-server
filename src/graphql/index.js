import { Query } from './queries'
import { Mutation } from './mutations'
import { User } from './models/User'
import { AuthPayload } from './models/AuthPayload'
import { Cordinates } from './models/Cordinates'
import { Workout } from './models/Workout'
import { PaymentMethods } from './models/PaymentMethods'
import { Referral } from './models/Referral'

export const resolvers = [
  Query,
  Mutation,
  User,
  AuthPayload,
  Cordinates,
  PaymentMethods,
  Workout,
  Referral,
]
