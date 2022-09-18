import React from 'react'

import FileInput from '@/components/FileInput'
import { ButtonVariant } from '@/components/Button'
import { HTMLInputEvent } from '@/hooks/useImageUpload'

type UploadImageProps = {
  onFileInputChange: (e: HTMLInputEvent) => Promise<void>
  loading: boolean
}

const UploadImage: React.FC<UploadImageProps> = ({ onFileInputChange, loading }) => {
  return (
    <div>
      <FileInput
        variant={ButtonVariant.Primary}
        className="image-upload-btn"
        loading={loading}
        onChange={onFileInputChange}
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
