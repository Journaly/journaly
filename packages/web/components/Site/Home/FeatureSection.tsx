import { useTranslation } from '@/config/i18n'
import FeatureComparisonTable from '@/components/FeatureComparisonTable'
import HomeSection from './HomeSection'

const FeatureSection = () => {
  const { t } = useTranslation('common')

  return (
    <HomeSection sectionHeading={t('home.featuresHeader')}>
      <div className="home-section-feature">
        <FeatureComparisonTable version="HOME" />
      </div>

      <style jsx>{`
        .home-section-feature {
          display: flex;
          justify-content: center;
          padding: 0 20px 20px;
        }

        /* @media (min-width: 960px) {
          .home-section-top {
            flex-direction: row;
            align-items: center;
            padding: 90px 20px;
          }

          .home-section-top h1 {
            margin-bottom: 0;
            text-align: left;
          }

          :global(.get-started-btn) {
            margin-left: 10px;
          }
        } */
      `}</style>
    </HomeSection>
  )
}

export default FeatureSection
