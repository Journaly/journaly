import React, { useState } from 'react'
import { useTranslation } from '@/config/i18n'
import Button, { ButtonVariant } from '@/components/Button'
import Modal from '@/components/Modal'
import UploadImage from './UploadImage'
import SearchUnsplash from './SearchUnsplash'
import theme from '@/theme'

type ImageUploadModalProps = {
  onImageSelect: () => void
  onCancel: () => void
  onUnsplashSelect: (smallSizeUrl: string, largeSizeUrl: string) => void
  onFileInputChange: () => void
  imageUploadLoading: boolean
}

enum UploadMethod {
  UPLOAD,
  UNSPLASH,
}

const ImageUploadModal: React.FC<ImageUploadModalProps> = ({
  onImageSelect,
  onFileInputChange,
  imageUploadLoading,
  onCancel,
}) => {
  const { t } = useTranslation('common')
  const [uploadMethod, setUploadMethod] = useState<UploadMethod>(UploadMethod.UPLOAD)

  return (
    <Modal
      title="Upload An Image"
      body={
        <>
          <div className="upload-method-container">
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
            <div className="upload-method-content">
              {uploadMethod === UploadMethod.UPLOAD ? (
                <UploadImage onFileInputChange={onFileInputChange} loading={imageUploadLoading} />
              ) : (
                <SearchUnsplash onImageSelect={onImageSelect} />
              )}
            </div>
          </div>
          <style jsx>{`
            .upload-method-container {
              display: flex;
              flex-direction: column;
              align-items: center;
              min-width: 320px;
              width: 480px;
              min-height: 240px;
            }

            .upload-method-toolbar {
              display: flex;
              gap: 10px;
              padding: 8px;
              width: 100%;
              justify-content: center;
            }

            .upload-method-toolbar > :global(button) {
              color: black;
              border-radius: 0;
              transition: border-bottom 200ms ease;
            }

            .upload-method-toolbar
              > :global(button:nth-child(${uploadMethod === UploadMethod.UPLOAD ? 1 : 2})) {
              border-bottom: 1px solid ${theme.colors.black};
            }

            .upload-method-content {
              display: flex;
              width: 100%;
              justify-content: center;
            }
          `}</style>
        </>
      }
      onClose={onCancel}
    />
  )
}

export default ImageUploadModal
