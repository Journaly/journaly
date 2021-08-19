import fetch from 'isomorphic-unfetch'

import { wait } from '@/utils'

type BaseUploadData = {
  uploadUrl: string
  checkUrl: string
}

const blobifyDataUrl = (url: string) => {
  const arr = url.split(',')

  if (arr.length !== 2) {
    throw new Error('Invalid data URI supplied.')
  }

  const match = arr[0].match(/:(.*?);/)

  if (!match || !match[1]) {
    throw new Error('Invalid data URI supplied.')
  }

  const mime = match[1]
  const bstr = atob(arr[1])
  let n = bstr.length
  const u8arr = new Uint8Array(n)

  while (n--) {
    u8arr[n] = bstr.charCodeAt(n)
  }

  return new Blob([u8arr], { type: mime })
}

type ImageUploadErrorType = 'GET_UPLOAD_DATA_ERROR' | 'UPLOAD_ERROR' | 'PROCESSING_ERROR'

type Result<T, E> = { failed: false; value: T } | { failed: true; error: E }

const uploadFile = async <T extends BaseUploadData>(
  getUploadData: () => Promise<T | undefined>,
  file: File,
): Promise<Result<T, ImageUploadErrorType>> => {
  let uploadData: T | undefined
  try {
    uploadData = await getUploadData()
  } catch (e) {
    return { failed: true, error: 'GET_UPLOAD_DATA_ERROR' }
  }

  if (!uploadData) {
    return { failed: true, error: 'GET_UPLOAD_DATA_ERROR' }
  }

  const { uploadUrl, checkUrl } = uploadData

  try {
    await fetch(uploadUrl, {
      method: 'PUT',
      body: file,
    })
  } catch (e) {
    return { failed: true, error: 'UPLOAD_ERROR' }
  }

  let successful = false
  for (let i = 0; i < 20; i++) {
    await wait(500)

    try {
      const response = await fetch(`${checkUrl}?t=${i}`, { method: 'HEAD' })
      if (response.status === 200) {
        successful = true
        break
      }
    } catch (e) {
      console.error(e)
    }
  }

  if (!successful) {
    return { failed: true, error: 'PROCESSING_ERROR' }
  }

  return { failed: false, value: uploadData }
}

export { uploadFile, blobifyDataUrl }

export type { ImageUploadErrorType, BaseUploadData }
