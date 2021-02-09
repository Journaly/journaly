import Link from 'next/link'
import { width } from '@/utils'
import theme from '@/theme'
import Button, { ButtonSize } from '@/components/Button'
import { useTranslation } from '@/config/i18n'

const TopSection = () => {
  const { t } = useTranslation('common')

  return (
    <div className="home-section-top">
      <h1>{t('home.elevatorPitch')}</h1>

      <Link href="/dashboard/signup">
        <Button className="get-started-btn" size={ButtonSize.Large}>
          {t('home.getStartedText')}
        </Button>
      </Link>

      <style jsx>{`
        .home-section-top {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 30px 20px;
          margin: 0 auto;
          max-width: ${width.desktopHD}px;
        }

        h1 {
          ${theme.typography.headingXL};
          margin-bottom: 30px;
          text-align: center;
          margin-right: 0;
        }

        :global(.get-started-btn) {
          margin-left: 0px;
        }

        @media (min-width: 960px) {
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
        }
      `}</style>
    </div>
  )
}

export default TopSection
