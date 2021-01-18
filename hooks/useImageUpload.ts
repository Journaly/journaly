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
  (e: HTMLInputEvent) => Promise<Image>,
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
    }

    const {
      data: {
        initiatePostImageUpload: {
          uploadUrl,
          checkUrl,
          finalUrlLarge,
          finalUrlSmall,
        }
      }
    } = await initImageUpload()

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
    setImage({
      large: finalUrlLarge,
      small: finalUrlSmall,
    })
  }

  return [image, uploadingImage, onFileInputChange, () => setImage(null)]
}

export default useImageUpload
