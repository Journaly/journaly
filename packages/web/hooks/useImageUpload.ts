import React, { useState } from 'react'
import { toast } from 'react-toastify'

import { useTranslation } from '@/config/i18n'
import { uploadFile, BaseUploadData } from '@/utils/images'

interface HTMLInputEvent extends React.FormEvent {
  target: HTMLInputElement & EventTarget
}

type UploadHookOutput<T> = [
  T | null,
  boolean,
  (e: HTMLInputEvent) => Promise<T | null>,
  () => void,
]

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

    const [err, result] = await uploadFile(getUploadData, files[0])

    setUploadingImage(false)

    if (err) {
      switch (result) {
        case 'GET_UPLOAD_DATA_ERROR':
          toast.error(t('imageErrors.initial'))
          break
        case 'UPLOAD_ERROR':
          toast.error(t('imageErrors.dataUpload'))
          break
        case 'PROCESSING_ERROR':
          toast.error(t('imageErrors.allDoneChecksFailed'))
          break
      }

      return null
    }

    setImage(result)
    return result
  }

  return [image, uploadingImage, onFileInputChange, () => setImage(null)]
}


export default useImageUpload
