import nodemailer from 'nodemailer'

export async function sendEmail(email, url, subject, text) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASSWORD,
    },
  })

  console.log('subject :>> ', subject)
  console.log('text :>> ', text)

  const mailOptions = {
    from: '"Gymless 💪🏻" <infogymless@gmail.com>',
    to: email,
    subject: subject,
    text: text,
    html: `<a href="${url}">${url}</a>`,
  }

  await transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error)
    } else {
      console.log('Email sent: ' + info.response)
    }
  })
}
