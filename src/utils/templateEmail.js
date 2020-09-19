import Email from 'email-templates'

export function templateEmail() {
  const email = new Email({
    message: {
      from: 'niftylettuce@gmail.com',
    },
    // uncomment below to send emails in development/test env:
    send: true,
    transport: {
      secure: true,
      host: 'smtp.gmail.com',
      port: 465,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASSWORD,
      },
    },
  })

  email
    .send({
      template: '../emails/mars',
      message: {
        to: 'elon@spacex.com',
      },
      locals: {
        name: 'Elon',
      },
    })
    .then(() => {
      console.log('Sent register email.')
    })
    .catch((err) => {
      console.error('Error sending register email: ' + err)
    })
}
