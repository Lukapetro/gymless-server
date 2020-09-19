import { schema } from 'nexus'
import { hash } from 'bcryptjs'
import { sign } from 'jsonwebtoken'
import { mutationField } from '@nexus/schema'
import { stripe } from '../../stripe'
import { sendEmail } from '../../utils/sendEmail'
import { createConfirmationUrl } from '../../utils/createConfirmationUrl'

import sendTemplateEmail from '../../emails/templateM'
import { GQLDate } from '../../utils/costants'

export const signup = mutationField('signup', {
  type: 'AuthPayload',
  args: {
    name: schema.stringArg({ required: true }),
    surname: schema.stringArg({ required: true }),
    birthDate: GQLDate,
    email: schema.stringArg({ nullable: false }),
    password: schema.stringArg({ nullable: false }),
    referrerId: schema.intArg(),
  },
  resolve: async (
    _parent,
    { name, surname, birthDate, email, password, referrerId },
    ctx,
  ) => {
    const hashedPassword = await hash(password, 10)

    const customer = await stripe.customers.create({
      name,
      email: email.toLowerCase(),
    })

    const user = await ctx.prisma.user.create({
      data: {
        name,
        surname,
        birthDate,
        email: email.toLowerCase(),
        customerId: customer.id,
        password: hashedPassword,
        lastLoggedIn: new Date(),
      },
    })

    if (!user) throw new Error("Errore nella creazione dell' utente")

    if (referrerId) {
      await ctx.prisma.referral.create({
        data: {
          referrer: {
            connect: { id: referrerId },
          },
          referred: {
            connect: { id: user.id },
          },
        },
      })
    }

    /* sendTemplateEmail({ name: user.name, userEmail: user.email })
     */
    await sendEmail(
      email,
      await createConfirmationUrl(user.id),
      'Conferma email',
      'Clicka sul seguente link per confermare la tua email',
    )

    return {
      token: sign({ userId: user.id }, process.env.APP_SECRET),
      user,
    }
  },
})
