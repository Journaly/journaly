import { v4 as uuidv4 } from 'uuid';
import { AWS } from './aws'

const s3 = new AWS.S3({ region: 'us-east-2' })

export const generateThumbbusterUrl = async (transform: string) => {
  const upBucket = process.env.THUMBBUSTER_UPLOAD_BUCKET

  if (!upBucket) {
    throw new Error('Must specify `THUMBBUSTER_UPLOAD_BUCKET` env var')
  }

  const uuid = uuidv4()
  const uploadUrl = await (new Promise<string>((res, rej) => {
    s3.getSignedUrl(
      'putObject',
      { Bucket: upBucket, Key: `${transform}/${uuid}` },
      (err, url) => err ? rej(err) : res(url)
    )
  }))

  return [uuid, uploadUrl]
}
