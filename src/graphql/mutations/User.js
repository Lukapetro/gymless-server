import { extendType, stringArg, enumType } from '@nexus/schema'
import { compare, hash } from 'bcryptjs'

const SexType = enumType({
  name: 'Sex',
  description: 'The sex of the user',
  members: ['male', 'female', 'unknown'],
})

export const user = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('updateUser', {
      type: 'User',
      args: {
        name: stringArg(),
        email: stringArg(),
        sex: SexType,
      },
      resolve: (parent, { name, email, sex }, ctx) => {
        if (!ctx.userId) {
          throw new Error('Non auteticato')
        }

        return ctx.prisma.user.update({
          data: {
            name: name,
            email: email,
            sex: sex,
          },
          where: {
            id: ctx.userId,
          },
        })
      },
    })

    t.field('updateUserPassword', {
      type: 'User',
      args: {
        oldPassword: stringArg(),
        newPassword: stringArg(),
      },
      resolve: async (parent, { oldPassword, newPassword }, ctx) => {
        //Pesco l'utente
        const user = await ctx.prisma.user.findOne({
          where: {
            id: ctx.userId,
          },
        })

        if (!user) {
          throw new Error(`Non autorizzato`)
        }

        //Paragono le password
        const passwordValid = await compare(oldPassword, user.password)
        if (!passwordValid) {
          throw new Error('Password attuale non valida')
        }

        //Cripto la nuova password
        const hashedPassword = await hash(newPassword, 10)

        //Aggiorno la password dell'utente
        return ctx.prisma.user.update({
          data: {
            password: hashedPassword,
          },
          where: {
            id: ctx.userId,
          },
        })
      },
    })

    t.field('deleteUser', {
      type: 'User',
      resolve: (parent, args, ctx) => {
        if (!ctx.userId) {
          throw new Error('Non auteticato')
        }

        return ctx.prisma.user.delete({
          where: {
            id: ctx.userId,
          },
        })
      },
    })

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
  },
})
