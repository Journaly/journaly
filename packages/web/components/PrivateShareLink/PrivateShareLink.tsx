import React from 'react'
import { toast } from 'react-toastify'
import Button, { ButtonVariant } from '@/components/Button'
import ContentCopyIcon from '../Icons/ContentCopyIcon'
import theme from '@/theme'
import { useTranslation } from 'next-i18next'

type PrivateShareLinkProps = {
  privateShareId: string
}

const PrivateShareLink: React.FC<PrivateShareLinkProps> = ({ privateShareId }) => {
  const { t } = useTranslation('post')
  const origin = 'https://journaly.com'
  const postPrivateShareLink = `${origin}/post/private/${privateShareId}`

  const handleCopyPrivateShareLink = async () => {
    if (navigator) {
      await navigator.clipboard.writeText(postPrivateShareLink)
      toast.success('Private share link has been copied to your clipboard!')
    }
  }

  return (
    <div className="private-share-link-container">
      <p>{t('privateShareLinkText')}</p>
      <a className="j-link" href={postPrivateShareLink}>
        {postPrivateShareLink}
      </a>
      <Button variant={ButtonVariant.Icon} onClick={handleCopyPrivateShareLink}>
        <ContentCopyIcon />
      </Button>
      <style jsx>{`
        .private-share-link-container {
          background-color: ${theme.colors.white};
          box-shadow: 0 12px 24px 0 rgba(0, 0, 0, 0.09);
          width: 100%;
          height: 100%;
          padding: 20px;
          text-align: center;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          margin-bottom: 2rem;
        }

        .private-share-link-container p {
          font-weight: 600;
        }

        .private-share-link-container a {
          padding: 10px;
          background-color: ${theme.colors.gray100};
          border-radius: 5px;
          border: 1px solid ${theme.colors.gray400};
        }

        @media (max-width: ${theme.breakpoints.XS}) {
          .private-share-link-container {
            flex-direction: column;
          }
        }
      `}</style>
    </div>
  )
}

export default PrivateShareLink
