import React, { useState } from 'react'
import fetch from 'isomorphic-unfetch'

import { useInitiatePostImageUploadMutation, } from '@/generated/graphql'

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

    for (let i = 0; i < 10; i++) {
      const response = await fetch(checkUrl, { method: 'HEAD' })
      if (response.status === 200) {
        break
      }

      await (new Promise(res => setTimeout(res, 500)))
    }

    setUploadingImage(false)

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
