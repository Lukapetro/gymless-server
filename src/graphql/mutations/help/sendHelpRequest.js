import { mutationField, stringArg } from '@nexus/schema'
import nodemailer from 'nodemailer'

export const sendHelpRequest = mutationField('sendHelpRequest', {
  type: 'Boolean',
  args: {
    message: stringArg(),
  },
  resolve: async (parent, { message }, ctx) => {
    const user = await ctx.prisma.user.findOne({
      where: {
        id: ctx.userId,
      },
    })

    if (!user) throw new Error('Utente non trovato')

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASSWORD,
      },
    })

    const mailOptions = {
      from: `"Centro Assistenza" ${user.email}`,
      to: 'infogymless@gmail.com',
      subject: 'Centro Assistenza',
      text: message,
      html: `<p>${message}</p>`,
    }

    await transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error)
      } else {
        console.log('Email sent: ' + info.response)
      }
    })

    return true
  },
})
