import React, { useState } from 'react'
import { useTranslation } from '@/config/i18n'
import Button, { ButtonVariant } from '@/components/Button'
import Modal from '@/components/Modal'
import UploadImage from './UploadImage'
import SearchUnsplash from './SearchUnsplash'

type ImageUploadModalProps = {
  onClose: () => void
}

enum UploadMethod {
  UPLOAD,
  UNSPLASH,
}

const ImageUploadModal: React.FC<ImageUploadModalProps> = ({ onClose }) => {
  const { t } = useTranslation('common')
  const [uploadMethod, setUploadMethod] = useState<UploadMethod>(UploadMethod.UPLOAD)

  return (
    <Modal
      title="Upload An Image"
      body={
        <>
          <div>
            <div className="upload-method-toolbar">
              <Button
                variant={ButtonVariant.Link}
                onClick={() => setUploadMethod(UploadMethod.UPLOAD)}
              >
                Upload
              </Button>
              <Button
                variant={ButtonVariant.Link}
                onClick={() => setUploadMethod(UploadMethod.UNSPLASH)}
              >
                Search Unsplash
              </Button>
            </div>
            <div>{uploadMethod === UploadMethod.UPLOAD ? <UploadImage /> : <SearchUnsplash />}</div>
          </div>
          <style jsx>{`
            .upload-method-toolbar {
              display: flex;
            }
          `}</style>
        </>
      }
      onClose={onClose}
    />
  )
}

export default ImageUploadModal
