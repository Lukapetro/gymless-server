import {
  extendType,
  stringArg,
  enumType,
  intArg,
  booleanArg,
} from '@nexus/schema'
import { compare, hash } from 'bcryptjs'
import { SexType, GQLDate } from '../../utils/costants'

export const user = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('updateUser', {
      type: 'User',
      args: {
        name: stringArg(),
        email: stringArg(),
        birthDate: GQLDate,
        sex: SexType,
      },
      resolve: (parent, { name, email, sex, birthDate }, ctx) => {
        if (!ctx.userId) {
          throw new Error('Non auteticato')
        }

        if (email)
          return ctx.prisma.user.update({
            data: {
              email: email.toLowerCase(),
            },
            where: {
              id: ctx.userId,
            },
          })

        return ctx.prisma.user.update({
          data: {
            name: name,
            sex: sex,
            birthDate: birthDate,
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

    t.field('updateUserClasses', {
      type: 'User',
      args: {
        classes: intArg({ required: true }),
      },
      resolve: async (parent, { classes }, ctx) => {
        //Pesco l'utente
        const user = await ctx.prisma.user.findOne({
          where: {
            id: ctx.userId,
          },
        })

        if (!user) {
          throw new Error(`Non autorizzato`)
        }

        //Controllo se dispone di classi per prenotare
        if (classes < 0 && user.classes === 0) {
          throw new Error('Classi non sufficienti')
        }

        //Aggiorno le classi dell'utente
        return ctx.prisma.user.update({
          data: {
            classes: user.classes + classes,
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
