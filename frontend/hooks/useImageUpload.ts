import React, { useState } from 'react'

interface HTMLInputEvent extends React.FormEvent {
  target: HTMLInputElement & EventTarget
}

type Image = {
  secure_url: string
  eager: [{ secure_url: string }]
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

  const onFileInputChange = async (e: HTMLInputEvent) => {
    setUploadingImage(true)
    const files = e.target.files
    const data = new FormData()

    if (files) {
      data.append('file', files[0])
      data.append('upload_preset', 'journaly')
    }

    const response = await fetch('https://api.cloudinary.com/v1_1/journaly/image/upload', {
      method: 'POST',
      body: data,
    })

    const file = (await response.json()) as Image
    setImage(file)
    setUploadingImage(false)
    return file
  }

  return [image, uploadingImage, onFileInputChange, () => setImage(null)]
}

export default useImageUpload
