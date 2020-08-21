import nodemailer from 'nodemailer'

module.exports.processJMailQueue = async (event, context, callback) => {
  const transport = nodemailer.createTransport({
    host: process.env.MAIL_HOST as string,
    port: parseInt(process.env.MAIL_PORT || '25', 10),
    auth: {
      user: process.env.MAIL_USER as string,
      pass: process.env.MAIL_PASSWORD as string,
    },
    secure: process.env.MAIL_SECURE === 'true',
  })

  for (let record of event.Records) {
    const { to, from, subject, html } = JSON.parse(record.body)

    await transport.sendMail({
      to,
      from,
      subject,
      html,
    })
  }

  console.log('Success!')

  context.done(null, '')
}
