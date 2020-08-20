import nodemailer from 'nodemailer'
import AWS from 'aws-sdk'

const sqs = new AWS.SQS({ region: 'us-west-1' })

const QUEUE_URL = `https://sqs.us-west-1.amazonaws.com/${process.env.AWS_ACCOUNT_ID}/JMailQueue`

module.exports.hello = (event, context, callback) => {
  const emailBody = `
      <div className="email" style="
        border: 1px solid black;
        padding: 20px;
        font-family: sans-serif;
        line-height: 2;
      font-size: 20px;
      ">
        <h2>Howdy, Journaler!</h2>
        Who cares!
        <p>Robin @ Journaly</p>
      </div>
    `
  const params = {
    MessageBody: JSON.stringify({
      to: 'hello@robinmacpherson.co',
      from: 'robin@journaly.com',
      subject: 'Hi!',
      html: emailBody,
    }),
    QueueUrl: QUEUE_URL,
  }

  sqs.sendMessage(params, function (err, data) {
    if (err) {
      console.log('error', 'Failed to send message' + err)

      const response = {
        statusCode: 500,
        body: JSON.stringify({
          message: 'ERROR',
        }),
      }

      callback(null, response)
    } else {
      console.log('data:', data.MessageId)

      const response = {
        statusCode: 200,
        body: JSON.stringify({
          message: data.MessageId,
        }),
      }
      callback(null, response)
    }
  })
}

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
