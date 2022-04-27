import React from 'react'

import FileInput from '@/components/FileInput'
import { ButtonVariant } from '@/components/Button'

type UploadImageProps = {
  onFileInputChange: () => void
}

const UploadImage: React.FC<UploadImageProps> = ({ onFileInputChange, uploadingImage }) => {
  return (
    <FileInput
      variant={ButtonVariant.Primary}
      className="image-upload-btn"
      loading={uploadingImage}
      onChange={onFileInputChange}
    >
      Choose image to upload
    </FileInput>
  )
}

export default UploadImage
