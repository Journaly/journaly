import * as AWS from 'aws-sdk'

AWS.config.credentials = new AWS.Credentials(
  process.env.JAWS_ACCESS_KEY_ID!,
  process.env.JAWS_SECRET_ACCESS_KEY!,
)

export { AWS }
