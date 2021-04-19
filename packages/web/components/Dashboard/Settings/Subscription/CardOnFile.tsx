import React from 'react'
import theme from '@/theme'
import Button, { ButtonSize, ButtonVariant } from '@/components/Button'
import { useTranslation } from '@/config/i18n'

type CardOnFileProps = {
  last4: string
  onUpdateCard: () => void
}

const CardOnFile = ({ last4, onUpdateCard }: CardOnFileProps) => {
  const { t } = useTranslation('settings')
  return (
    <div className="container">
      <p>{t('subscription.cardOnFile')}</p>
      <div className="number-container">
        <div>XXXX</div>
        <span className="divider">-</span>
        <div>XXXX</div>
        <span className="divider">-</span>
        <div>XXXX</div>
        <span className="divider">-</span>
        <div>{last4}</div>
      </div>
      <div className="card-action-container">
        <Button
          size={ButtonSize.Small}
          variant={ButtonVariant.Link}
          style={{ marginRight: '20px' }}
          onClick={onUpdateCard}
        >
          {t('subscription.updateCard')}
        </Button>
      </div>
      <style jsx>{`
        .container {
          display: flex;
          flex-direction: column;
          width: 100%;
          max-width: 320px;
          padding: 30px 15px;
          border-radius: 5px;
          background-color: ${theme.colors.gray100};
          box-shadow: 0px 8px 10px #00000029;
          align-items: center;
          justify-content: center;
          margin: 10px 0 15px;
        }

        .container > p {
          font-size: ${theme.typography.paragraphSM};
          font-weight: 600;
          text-transform: uppercase;
          color: ${theme.colors.gray600}; 
        }

        .number-container {
          display: flex;
          justify-content: center;
          flex-wrap: wrap;
          font-weight: 600;
          font-size: 20px;
          margin: 0 0 10px;
        }
        
        .divider {
          margin: 0 10px;
        }

        .card-action-container {
          display: flex;
        }
    `}</style>
    </div>
  )
}

export default CardOnFile
