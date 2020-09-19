import Email from 'email-templates'
import nodemailer from 'nodemailer'

export default function sendTemplateEmail({ name, userEmail }) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASSWORD,
    },
  })

  const email = new Email({
    views: { root: __dirname },
    message: {
      from: 'welcome@gymless.app',
    },
    send: true,
    transport: transporter,
  })

  email
    .send({
      template: 'confirmation',
      message: {
        to: userEmail,
      },
      locals: {
        name: name,
      },
    })
    .then((res) => {
      console.log('res.originalMessage', res.originalMessage)
    })
    .catch(console.error)
}
