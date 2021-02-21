import fetch from 'isomorphic-unfetch'

import { wait } from '@/utils'

type BaseUploadData = {
  uploadUrl: string
  checkUrl: string
}

const blobifyDataUrl = (url: string) => {
  const arr = url.split(',')
  const mime = arr[0].match(/:(.*?);/)[1]
  const bstr = atob(arr[1])
  const u8arr = new Uint8Array(n)
  let n = bstr.length

  while (n--) {
    u8arr[n] = bstr.charCodeAt(n)
  }

  return new Blob([u8arr], { type: mime })
}

type ImageUploadErrorType = 
  | 'GET_UPLOAD_DATA_ERROR'
  | 'UPLOAD_ERROR'
  | 'PROCESSING_ERROR'

type Result<T, E> = 
  | [false, T]
  | [true, E]

const uploadFileOrBlob = async <T extends BaseUploadData>(getUploadData: () => Promise<T | undefined>, file: Blob|File): Promise<Result<T, ImageUploadErrorType>>  => {
    let uploadData: T | undefined
    try {
      uploadData = await getUploadData()
    } catch (e) {
      return [true, 'GET_UPLOAD_DATA_ERROR']
    }

    if (!uploadData) {
      return [true, 'GET_UPLOAD_DATA_ERROR']
    }

    const { uploadUrl, checkUrl } = uploadData

    try {
      await fetch(uploadUrl, {
        method: 'PUT',
        body: file
      })
    } catch (e) {
      return [true, 'UPLOAD_ERROR']
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
      return [true, 'PROCESSING_ERROR']
    }

    return [false, uploadData]
}

export {
  uploadFileOrBlob,
  blobifyDataUrl,
  BaseUploadData,
  ImageUploadErrorType,
}

