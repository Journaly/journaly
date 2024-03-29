import React, { useState } from 'react'
import { useTranslation } from '@/config/i18n'
import Button, { ButtonVariant } from '@/components/Button'
import Modal from '@/components/Modal'
import theme from '@/theme'
import { InitiatePostImageUploadResponse } from '@/generated/graphql'
import UploadImage from './UploadImage'
import SearchUnsplash from './SearchUnsplash'

type ImageUploadModalProps = {
  onImageSelect: (image: InitiatePostImageUploadResponse | null) => void
  onCancel: () => void
}

enum UploadMethod {
  UPLOAD,
  UNSPLASH,
}

const ImageUploadModal: React.FC<ImageUploadModalProps> = ({ onImageSelect, onCancel }) => {
  const { t } = useTranslation('common')
  const [uploadMethod, setUploadMethod] = useState<UploadMethod>(UploadMethod.UPLOAD)

  return (
    <Modal
      title={t('modal.imageUploadModalTitle')}
      maxWidth="100vw"
      body={
        <>
          <div className="upload-method-container">
            <div className="upload-method-toolbar">
              <Button
                className="upload-method-btn"
                variant={ButtonVariant.Link}
                onClick={() => setUploadMethod(UploadMethod.UPLOAD)}
              >
                {t('modal.uploadImage')}
              </Button>
              <Button
                className="upload-method-btn"
                variant={ButtonVariant.Link}
                onClick={() => setUploadMethod(UploadMethod.UNSPLASH)}
              >
                {t('modal.searchUnsplash')}
              </Button>
            </div>
            <div className="upload-method-content">
              {uploadMethod === UploadMethod.UPLOAD ? (
                <div className='upload-method-explanation'>
                  <p>{t('modal.uploadImageMethodExplanation')}</p>
                  <UploadImage onImageSelect={onImageSelect} />
                </div>
              ) : (
                <div className='upload-method-explanation'>
                  <p>{t('modal.unsplashImageMethodExplanation')}</p>
                  <SearchUnsplash onImageSelect={onImageSelect} />
                </div>
              )}
            </div>
          </div>
          <style jsx>{`
            .upload-method-container {
              display: flex;
              flex-direction: column;
              align-items: center;
              width: 88vw;
            }

            .upload-method-explanation {
              font-size: 12px;
              text-align: center;
              font-style: italic;
              width: 100%;
            }

            .upload-method-explanation > p {
              margin: 8px 0 16px;
            }

            @media (min-width: ${theme.breakpoints.XS}) {
              .upload-method-container {
                width: 70vw;
                min-height: 240px;
                min-width: 320px;
              }
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
              > :global(button.upload-method-btn:nth-child(${uploadMethod === UploadMethod.UPLOAD
                    ? 1
                    : 2})) {
              border-bottom: 1px solid ${theme.colors.black};
            }

            .upload-method-toolbar
              > :global(button.upload-method-btn:nth-child(${uploadMethod === UploadMethod.UPLOAD
                    ? 1
                    : 2})):focus {
              border-bottom: 1px solid ${theme.colors.black};
            }
            .upload-method-toolbar > :global(button.upload-method-btn):hover:not(:disabled) {
              text-decoration: none;
            }

            .upload-method-content {
              display: flex;
              flex: 1;
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
