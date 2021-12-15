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

export const getThumbusterVars = (): [string, string] => {
  const transformBucket = process.env.THUMBBUSTER_TRANSFORM_BUCKET
  const cdnDomain = process.env.THUMBBUSTER_CDN_DOMAIN

  if (!transformBucket) {
    throw new Error('Must specify `THUMBBUSTER_TRANSFORM_BUCKET` env var')
  } else if (!cdnDomain) {
    throw new Error('Must specify `THUMBBUSTER_CDN_DOMAIN` env var')
  }

  return [transformBucket, cdnDomain]
}

export const generatePostPrivateShareId = () => uuidv4()