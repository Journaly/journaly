import React from 'react'

import FileInput from '@/components/FileInput'
import { ButtonVariant } from '@/components/Button'

type UploadImageProps = {
  onFileInputChange: () => void
  loading: boolean
}

const UploadImage: React.FC<UploadImageProps> = ({ onFileInputChange, loading }) => {
  return (
    <FileInput
      variant={ButtonVariant.Primary}
      className="image-upload-btn"
      loading={loading}
      onChange={onFileInputChange}
    >
      Choose image to upload
    </FileInput>
  )
}

export default UploadImage
