import FeatureComparisonTable from '@/components/FeatureComparisonTable'
import theme from '@/theme'
import { useTranslation } from 'next-i18next'

const Pricing = () => {
  const { t } = useTranslation('settings')

  return (
    <div className="pricing-wrapper">
      <h1>{t('subscription.title')}</h1>
      <p className="subscription-copy" style={{ marginBottom: '20px' }}>
        {t('subscription.premiumGeneralCopy')}
      </p>
      <div className="feature-table-container">
        <FeatureComparisonTable />
      </div>
      <p className="subscription-copy" style={{ marginBottom: '20px' }}>
        {t('subscription.premiumFeatureCopy')}
      </p>
      <style jsx>{`
        .pricing-wrapper {
          max-width: 900px;
          margin: 50px auto 0;
          padding: 50px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          background: ${theme.colors.white};
          box-shadow: 0 0 5px 3px rgba(0, 0, 0, 0.05);
        }

        .subscription-copy {
          margin-bottom: 20px;
          text-align: center;
        }

        .feature-table-container {
          display: flex;
          justify-content: center;
          margin: 35px 0;
        }

        h1 {
          text-align: center;
          font-weight: 700;
          font-size: 28px;
          margin-bottom: 20px;
        }

        p {
          margin-bottom: 35px;
        }
      `}</style>
    </div>
  )
}

export default Pricing
