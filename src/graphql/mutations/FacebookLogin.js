import { schema } from 'nexus'
import { sign } from 'jsonwebtoken'
import { mutationField } from '@nexus/schema'
import { authenticateFacebook } from '../../utils/facebookAuth'
import { stripe } from '../../stripe'

export const facebookLogin = mutationField('facebookLogin', {
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
        //Cerco l'utente in base alla mail

        const userExist = await prisma.user.findOne({
          where: {
            email: data.profile._json.email,
          },
        })

        if (userExist) {
          return {
            token: sign({ userId: userExist.id }, process.env.APP_SECRET),
            user: userExist,
          }
        }

        const customer = await stripe.customers.create({
          name: data.profile.displayName,
          email: data.profile._json.email.toLowerCase(),
        })

        const user = await prisma.user.upsert({
          where: {
            email: data.profile._json.email,
          },
          update: {
            facebookId: data.profile.id,
          },
          create: {
            name: data.profile._json.first_name,
            surname: data.profile._json.last_name,
            email: data.profile._json.email,
            customerId: customer.id,
            lastLoggedIn: new Date(),
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
