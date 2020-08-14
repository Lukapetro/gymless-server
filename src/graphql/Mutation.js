import { compare, hash } from 'bcryptjs'
import { sign } from 'jsonwebtoken'
import { schema } from 'nexus'
import { idArg, arg, inputObjectType, stringArg } from '@nexus/schema'
import { stripe } from '../stripe'
import { authenticateFacebook } from '../utils/facebookAuth'
import { GraphQLDateTime } from 'graphql-iso-date'

export const DateTime = GraphQLDateTime

const ImageInput = inputObjectType({
  name: 'ImageInput',
  definition(t) {
    t.string('path', { required: true })
  },
})

export const Mutation = schema.mutationType({
  definition(t) {
    //WORKOUT
    t.crud.createOneWorkout()
    t.crud.updateOneWorkout()
    t.crud.deleteOneWorkout()

    //CORDINATE
    t.crud.createOneCordinates()
    t.crud.updateOneCordinates()
    t.crud.deleteOneCordinates()

    t.crud.updateOneUser()

    t.field('updateAvatar', {
      type: 'User',
      args: {
        avatarId: stringArg(),
      },
      resolve: async (parent, { avatarId }, ctx) => {
        if (!ctx.userId) {
          throw new Error('Not athenticated')
        }

        return ctx.prisma.user.update({
          data: {
            avatarId: avatarId,
          },
          where: {
            id: ctx.userId,
          },
        })
      },
    })

    t.field('createWorkout', {
      type: 'Workout',
      args: {
        title: schema.stringArg(),
        description: schema.stringArg(),
        location: schema.stringArg(),
        spots: schema.intArg(),
        cordinatesId: schema.intArg(),
        date: DateTime,
      },
      resolve: async (
        _,
        { title, description, location, spots, date, cordinatesId },
        ctx,
      ) => {
        const user = await ctx.prisma.user.findOne({
          where: {
            id: ctx.userId,
          },
        })

        if (user.role !== 'trainer') {
          throw new Error('Utente non abilitato')
        }

        return ctx.prisma.workout.create({
          data: {
            title,
            description,
            location,
            spots,
            date,
            trainer: {
              connect: {
                id: ctx.userId,
              },
            },
            cordinates: {
              connect: {
                id: cordinatesId,
              },
            },
          },
        })
      },
    })

    t.field('signup', {
      type: 'AuthPayload',
      args: {
        name: schema.stringArg(),
        email: schema.stringArg({ nullable: false }),
        password: schema.stringArg({ nullable: false }),
      },
      resolve: async (_parent, { name, email, password }, ctx) => {
        const hashedPassword = await hash(password, 10)
        const user = await ctx.prisma.user.create({
          data: {
            name,
            email,
            password: hashedPassword,
          },
        })
        return {
          token: sign({ userId: user.id }, process.env.APP_SECRET),
          user,
        }
      },
    })
    t.field('login', {
      type: 'AuthPayload',
      args: {
        email: schema.stringArg({ nullable: false }),
        password: schema.stringArg({ nullable: false }),
      },
      resolve: async (_parent, { email, password }, ctx) => {
        const user = await ctx.prisma.user.findOne({
          where: {
            email,
          },
        })
        if (!user) {
          throw new Error(`No user found for email: ${email}`)
        }
        const passwordValid = await compare(password, user.password)
        if (!passwordValid) {
          throw new Error('Invalid password')
        }
        return {
          token: sign({ userId: user.id }, process.env.APP_SECRET),
          user,
        }
      },
    })

    t.field('trainerLogin', {
      type: 'AuthPayload',
      args: {
        email: schema.stringArg({ nullable: false }),
        password: schema.stringArg({ nullable: false }),
      },
      resolve: async (_parent, { email, password }, ctx) => {
        const user = await ctx.prisma.user.findOne({
          where: {
            email,
          },
        })

        if (user.role !== 'trainer') {
          throw new Error(`Utente non abilitato`)
        }

        const passwordValid = await compare(password, user.password)
        if (!passwordValid) {
          throw new Error('Invalid password')
        }
        return {
          token: sign({ userId: user.id }, process.env.APP_SECRET),
          user,
        }
      },
    })

    t.field('facebookLogin', {
      type: 'AuthPayload',
      args: {
        fbToken: schema.stringArg({ nullable: false }),
      },
      resolve: async (_, { fbToken }, { req, res, prisma }) => {
        req.body = {
          ...req.body,
          access_token: fbToken,
        }

        try {
          const { data, info } = await authenticateFacebook(req, res)

          if (data) {
            const user = await prisma.user.upsert({
              where: {
                email: data.profile._json.email,
              },
              update: {
                facebookId: data.profile.id,
              },
              create: {
                name: data.profile.displayName,
                email: data.profile._json.email,
                password: '',
                facebookId: data.profile.id,
              },
            })

            if (user) {
              return {
                token: sign({ userId: user.id }, process.env.APP_SECRET),
                user,
              }
            }
          }

          if (info) {
            console.log(info)
            switch (info.code) {
              case 'ETIMEDOUT':
                return new Error('Failed to reach Facebook: Try Again')
              default:
                return new Error('something went wrong')
            }
          }
          return Error('server error')
        } catch (error) {
          return error
        }
      },
    })

    t.field('paymentIntent', {
      type: 'String',
      resolve: async (parent, { id }, ctx) => {
        const paymentIntent = await stripe.paymentIntents.create({
          amount: 1000,
          currency: 'usd',
        })

        return paymentIntent.client_secret
      },
    })

    t.field('bookWorkout', {
      type: 'Workout',
      args: {
        id: idArg(),
      },
      resolve: async (parent, { id }, ctx) => {
        if (!ctx.userId) {
          throw new Error('Not athenticated')
        }

        //Check se il pagamento è ok

        return ctx.prisma.workout.update({
          data: {
            partecipants: {
              connect: [
                {
                  id: ctx.userId,
                },
              ],
            },
          },
          where: {
            id: Number(id),
          },
        })
      },
    })
    t.field('deleteBooking', {
      type: 'Workout',
      args: {
        id: idArg(),
      },
      resolve: (parent, { id }, ctx) => {
        return ctx.prisma.workout.update({
          data: {
            partecipants: {
              disconnect: [
                {
                  id: ctx.userId,
                },
              ],
            },
          },
          where: {
            id: Number(id),
          },
        })
      },
    })
  },
})
