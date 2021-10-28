import React, { useCallback } from 'react'
import { useSlate } from 'slate-react'

import { useTranslation, Router } from '@/config/i18n'
import BaseToolbarButton from './BaseToolbarButton'
import { insertImage } from '../helpers'
import PremiumFeatureModal from '@/components/Modals/PremiumFeatureModal'

interface HTMLInputEvent extends React.FormEvent {
  target: HTMLInputElement & EventTarget
}

type InsertImageButtonProps = {
  allowInlineImages: boolean
  children: React.ReactNode
}

const InsertImageButton = ({ children, allowInlineImages }: InsertImageButtonProps) => {
  const { t } = useTranslation('post')
  const editor = useSlate()
  const fileInput = React.useRef<HTMLInputElement>(null)
  const [displayPremiumFeatureModal, setDisplayPremiumFeatureModal] = React.useState(false)

  const handleClick = useCallback(
    (event: React.MouseEvent) => {
      event.preventDefault()
      if (!allowInlineImages) {
        setDisplayPremiumFeatureModal(true)
      } else if (fileInput && fileInput.current) {
        fileInput.current.click()
      }
    },
    [editor, fileInput],
  )

  const handleChange = useCallback(
    (event: HTMLInputEvent) => {
      event.preventDefault()
      const files = event.target.files
      if (files) {
        insertImage(editor, files[0])
      }
      event.target.value = ''
    },
    [editor, fileInput],
  )

  return (
    <>
      <BaseToolbarButton active={false} onClick={handleClick}>
        {children}
      </BaseToolbarButton>
      <input className="file-input" onChange={handleChange} type="file" ref={fileInput} />
      {displayPremiumFeatureModal && (
        <PremiumFeatureModal
          featureExplanation={t('inlineImagesPremiumFeatureExplanation')}
          onAcknowledge={(): void => {
            setDisplayPremiumFeatureModal(false)
          }}
          onGoToPremium={(): void => {
            Router.push('/dashboard/settings/subscription')
            setDisplayPremiumFeatureModal(false)
          }}
        />
      )}
      <style jsx>{`
        .file-input {
          display: none;
        }
      `}</style>
    </>
  )
}

export default InsertImageButton
