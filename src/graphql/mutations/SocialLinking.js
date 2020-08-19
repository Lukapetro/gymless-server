import { extendType } from '@nexus/schema'
import { schema } from 'nexus'
import { authenticateFacebook } from '../../utils/facebookAuth'

export const socialLinking = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('facebookDisconnect', {
      type: 'User',
      resolve: (parent, args, ctx) => {
        if (!ctx.userId) {
          throw new Error('Utente non trovato')
        }

        return ctx.prisma.user.update({
          data: {
            facebookId: null,
          },
          where: {
            id: ctx.userId,
          },
        })
      },
    })

    t.field('facebookConnect', {
      type: 'User',
      args: {
        fbToken: schema.stringArg({ nullable: false }),
      },
      resolve: async (parent, { fbToken }, { req, res, prisma, userId }) => {
        req.body = {
          ...req.body,
          access_token: fbToken,
        }

        console.log('userId', userId)

        try {
          const { data, info } = await authenticateFacebook(req, res)

          if (data) {
            const user = await prisma.user.update({
              where: {
                id: userId,
              },
              data: {
                facebookId: data.profile.id,
              },
            })

            if (user) {
              return user
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
  },
})
