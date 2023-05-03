import theme from '@/theme'
import React from 'react'
import { useTranslation } from '@/config/i18n'
import CheckmarkCircleIcon from '../Icons/CheckmarkCircleIcon'

type FeatureProps = {
  name: string
  plan: string
  status?: string
}

type FeatureComparisonTableProps = {
  version?: 'HOME' | 'SETTINGS'
}

const Feature = ({ name, plan, status }: FeatureProps) => {
  const color = plan === 'premium' ? 'white' : 'blue'
  return (
    <li>
      <CheckmarkCircleIcon color={color} />
      <span className={status === 'coming soon' ? 'coming-soon' : ''}>{name}</span>
      <style jsx>{`
        li {
          display: flex;
          align-items: center;
          font-weight: 600;
        }

        span {
          margin-left: 10px;
        }
        .coming-soon {
          font-style: italic;
          font-weight: 400;
        }
      `}</style>
    </li>
  )
}

const FeatureComparisonTable = ({ version = 'SETTINGS' }: FeatureComparisonTableProps) => {
  const { t } = useTranslation('settings')

  return (
    <div className="container">
      <div className="col free">
        <div className="header">
          <div className="plan">{t('subscription.freePlan')}</div>
        </div>
        <div className="feature-list">
          <ul>
            <Feature name={t('subscription.features.unlimitedLanguages')} plan="free" />
            <Feature name={t('subscription.features.numSupportedLanguages')} plan="free" />
            <Feature name={t('subscription.features.unlimitedPosts')} plan="free" />
            <Feature name={t('subscription.features.unlimitedFeedback')} plan="free" />
            <Feature name={t('subscription.features.customHeaderImages')} plan="free" />
            <Feature name={t('subscription.features.advancedFiltering')} plan="free" />
            <Feature name={t('subscription.features.badges')} plan="free" />
            <Feature name={t('subscription.features.stats')} plan="free" />
            <Feature name={t('subscription.features.unsplashIntegration')} plan="free" />
            <Feature name={t('subscription.features.numSupportedUiLanguages')} plan="free" />
            <Feature
              name={t('subscription.features.directMessaging')}
              plan="free"
              status="coming soon"
            />
            <Feature
              name={t('subscription.features.userGroups')}
              plan="free"
              status="coming soon"
            />
          </ul>
        </div>
      </div>
      <div className="col premium">
        <div className="header">
          <div className="plan">{t('subscription.premiumPlan')}</div>
          <div className="price">
            {t('subscription.only')} <strong>{t('subscription.onlyPrice')}</strong>{' '}
            {t('subscription.paidAnnually')}
          </div>
        </div>
        <div className="feature-list">
          <ul>
            <Feature name={t('subscription.features.inlineImages')} plan="premium" />
            <Feature name={t('subscription.features.postBumping')} plan="premium" />
            <Feature name={t('subscription.features.postSaving')} plan="premium" />
            <Feature name={t('subscription.features.privateShareLinks')} plan="premium" />
            <Feature name={t('subscription.features.supportTheCreators')} plan="premium" />
            <Feature name={t('subscription.features.supportFreeLearning')} plan="premium" />
            <Feature
              name={t('subscription.features.writingPrompts')}
              plan="premium"
              status="coming soon"
            />
            <Feature
              name={t('subscription.features.focusMode')}
              plan="premium"
              status="coming soon"
            />
            <Feature
              name={t('subscription.features.postThemes')}
              plan="premium"
              status="coming soon"
            />
            <Feature
              name={t('subscription.features.audioPosts')}
              plan="premium"
              status="coming soon"
            />
            <Feature
              name={t('subscription.features.weeklyGoals')}
              plan="premium"
              status="coming soon"
            />
            <Feature
              name={t('subscription.features.privateGroups')}
              plan="premium"
              status="coming soon"
            />
            <Feature
              name={t('subscription.features.correctionsInDms')}
              plan="premium"
              status="coming soon"
            />
            <Feature
              name={t('subscription.features.savedMessagesInDms')}
              plan="premium"
              status="coming soon"
            />
          </ul>
        </div>
      </div>
      <style jsx>{`
        .container {
          display: flex;
        }
        .col {
          width: 320px;
          border-radius: 8px;
          padding: 25px;
        }
        .free {
          background: ${version === 'SETTINGS' ? theme.colors.gray200 : theme.colors.white};
          box-shadow: 0 7px 30px rgba(0, 0, 0, 0.05);
        }

        .premium {
          background: ${theme.colors.blueLight};
          color: ${theme.colors.white};
          box-shadow: 0 7px 30px rgba(52, 13, 135, 0.3);
          margin: -10px;
        }
        .header {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          padding-bottom: 10px;
          margin-bottom: 15px;
        }

        .plan {
          font-size: 24px;
          font-weight: 700;
          text-transform: uppercase;
        }

        .free .header {
          padding: 12px;
          border-bottom: 1px ${theme.colors.charcoal} solid;
        }
        .premium .header {
          border-bottom: 1px ${theme.colors.white} solid;
        }
        .price {
          font-style: italic;
        }

        @media (max-width: 920px) {
          .container {
            flex-direction: column;
            align-items: center;
          }
        }
      `}</style>
    </div>
  )
}

export default FeatureComparisonTable
