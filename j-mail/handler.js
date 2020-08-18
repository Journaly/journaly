'use strict'

const AWS = require('aws-sdk')
const sqs = new AWS.SQS({ region: 'us-west-1' })

const AWS_ACCOUNT = process.env.ACCOUNT_ID
const QUEUE_URL = `https://sqs.us-west-1.amazonaws.com/${AWS_ACCOUNT}/JMailQueue`

module.exports.hello = (event, context, callback) => {
  const params = {
    MessageBody: 'Hello!',
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

module.exports.sqsHello = (event, context, callback) => {
  console.log('It was called!')
  console.log(event)
  context.done(null, '')
}
