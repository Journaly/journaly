import React, { useState } from 'react'
import fetch from 'isomorphic-unfetch'
import { toast } from 'react-toastify'

import { useTranslation } from '@/config/i18n'
import { wait } from '@/utils'

interface HTMLInputEvent extends React.FormEvent {
  target: HTMLInputElement & EventTarget
}

type UploadHookOutput<T> = [
  T | null,
  boolean,
  (e: HTMLInputEvent) => Promise<T | null>,
  () => void,
]

type BaseUploadData = {
  uploadUrl: string
  checkUrl: string
}

export interface UploadHook<T> {
  (): UploadHookOutput<T>
}


const useImageUpload = <T extends BaseUploadData>(getUploadData: () => Promise<T | undefined>): UploadHookOutput<T> => {
  const [image, setImage] = useState<T | null>(null)
  const [uploadingImage, setUploadingImage] = useState(false)
  const { t } = useTranslation('common')

  const onFileInputChange = async (e: HTMLInputEvent) => {
    setUploadingImage(true)

    const files = e.target.files

    if (!files) {
      setUploadingImage(false)
      return null
    }

    let uploadData: T | undefined
    try {
      uploadData = await getUploadData()
    } catch (e) {
      console.error(e)
      setUploadingImage(false)
      toast.error(t('imageErrors.initial'))
      return null
    }

    if (!uploadData) {
      setUploadingImage(false)
      toast.error(t('imageErrors.initital'))
      return null
    }

    const { uploadUrl, checkUrl, } = uploadData

    try {
      await fetch(uploadUrl, {
        method: 'PUT',
        body: files[0]
      })
    } catch (e) {
      console.error(e)
      setUploadingImage(false)
      toast.error(t('imageErrors.dataUpload'))
      return null
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

    setUploadingImage(false)

    if (!successful) {
      toast.error(t('imageErrors.allDoneChecksFailed'))
      return null
    }

    setImage(uploadData)
    return uploadData
  }

  return [image, uploadingImage, onFileInputChange, () => setImage(null)]
}


export default useImageUpload
