import React, { useState } from 'react'
import fetch from 'isomorphic-unfetch'
import { toast } from 'react-toastify'

import { useTranslation } from '@/config/i18n'
import { useInitiatePostImageUploadMutation } from '@/generated/graphql'
import { wait } from '@/utils'

interface HTMLInputEvent extends React.FormEvent {
  target: HTMLInputElement & EventTarget
}

type Image = {
  large: string
  small: string
}

type useImageUploadType = [
  Image | null,
  boolean,
  (e: HTMLInputEvent) => Promise<Image | null>,
  () => void,
]

const useImageUpload = (): useImageUploadType => {
  const [image, setImage] = useState<Image | null>(null)
  const [uploadingImage, setUploadingImage] = useState(false)
  const [initImageUpload] = useInitiatePostImageUploadMutation()
  const { t } = useTranslation('common')

  const onFileInputChange = async (e: HTMLInputEvent) => {
    setUploadingImage(true)

    const files = e.target.files

    if (!files) {
      setUploadingImage(false)
      return null
    }

    const { data: uploadData } = await initImageUpload()

    if (!uploadData) {
      setUploadingImage(false)
      return null
    }

    const {
      initiatePostImageUpload: {
        uploadUrl,
        checkUrl,
        finalUrlLarge,
        finalUrlSmall,
      }
    } = uploadData

    await fetch(uploadUrl, {
      method: 'PUT',
      body: files[0]
    })

    let successful = false
    for (let i = 0; i < 10; i++) {
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

    const returnValue = {
      large: finalUrlLarge,
      small: finalUrlSmall,
    }

    setImage(returnValue)
    return returnValue
  }

  return [image, uploadingImage, onFileInputChange, () => setImage(null)]
}

export default useImageUpload
