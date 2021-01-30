import React, { useState } from 'react'
import fetch from 'isomorphic-unfetch'
import { toast } from 'react-toastify'

import { useTranslation } from '@/config/i18n'
import { wait } from '@/utils'

interface HTMLInputEvent extends React.FormEvent {
  target: HTMLInputElement & EventTarget
}

interface UploadHook<T> {
  (getUploadData: () => Promise<T>): [
    T | null,
    boolean,
    (e: HTMLInputEvent) => Promise<T | null>,
    () => void,
  ]
}

const useImageUpload: UploadHook = (getUploadData) => {
  const [image, setImage] = useState<Image | null>(null)
  const [uploadingImage, setUploadingImage] = useState(false)
  const { t } = useTranslation('common')

  const onFileInputChange = async (e: HTMLInputEvent) => {
    setUploadingImage(true)

    const files = e.target.files

    if (!files) {
      setUploadingImage(false)
      return null
    }

    const uploadData: T  = await getUploadData()

    if (!uploadData) {
      setUploadingImage(false)
      return null
    }

    const { uploadUrl, checkUrl, } = uploadData

    await fetch(uploadUrl, {
      method: 'PUT',
      body: files[0]
    })

    let successful = false
    for (let i = 0; i < 20; i++) {
      await wait(500)

      const response = await fetch(checkUrl, { method: 'HEAD' })
      if (response.status === 200) {
        successful = true
        break
      }
    }

    setUploadingImage(false)

    if (!successful) {
      toast.error(t('imageUploadErrorMessage'))
      return null
    }

    setImage(uploadData)
    return uploadData
  }

  return [image, uploadingImage, onFileInputChange, () => setImage(null)]
}


export default useImageUpload
