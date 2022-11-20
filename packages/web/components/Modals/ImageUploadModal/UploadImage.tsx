import React from 'react'

import FileInput from '@/components/FileInput'
import { ButtonVariant } from '@/components/Button'
import usePostImageUpload from '@/hooks/usePostImageUpload'
import { InitiatePostImageUploadResponse } from '@/generated/graphql'
import { HTMLInputEvent } from '@/hooks/useImageUpload'

type UploadImageProps = {
  onImageSelect: (image: InitiatePostImageUploadResponse | null) => void
}

const UploadImage: React.FC<UploadImageProps> = ({ onImageSelect }) => {
  const { image, uploadingImage, onFileInputChange } = usePostImageUpload()

  const onChange = async (e: HTMLInputEvent) => {
    const result = await onFileInputChange(e)
    onImageSelect(result)
  }

  return (
    <div>
      <FileInput
        variant={ButtonVariant.Primary}
        className="image-upload-btn"
        loading={uploadingImage}
        onChange={onChange}
      >
        Choose image to upload
      </FileInput>
      <style jsx>{`
        div {
          display: flex;
          align-items: center;
          justify-content: center;
        }
      `}</style>
    </div>
  )
}

export default UploadImage
