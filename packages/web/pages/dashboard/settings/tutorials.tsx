import React from 'react'
import { NextPage } from 'next'
import { withApollo } from '@/lib/apollo'
import SettingsPageLayout from '@/components/Layouts/SettingsPageLayout'
import AuthGate from '@/components/AuthGate'
import { useTranslation } from '@/config/i18n'
import theme from '@/theme'

const Tutorials: NextPage = () => {
  const { t } = useTranslation('tutorials')
  return (
    <AuthGate>
      <>
        <SettingsPageLayout>
          <div className="forms-container">
            <div className="tutorials-container">
              <h1>{t('pageTitle')}</h1>
              <div>
                <h2>A Tour of Your Dashboard</h2>
              </div>
              <hr />
              <div>
                <h2>Write A Post</h2>
              </div>
              <hr />
              <div>
                <h2>Correct A Post</h2>
              </div>
              <hr />
              <div>
                <h2>Give Thanks For Feedback</h2>
              </div>
              <hr />
              <div>
                <h2>Apply Corrections To Your Post</h2>
              </div>
              <hr />
              <div>
                <h2>Leave General Comments</h2>
              </div>
              <hr />
              <div>
                <h2>Explore Your Notification Feed</h2>
              </div>
              <hr />
              <div>
                <h2>Explore Your Daily Digest Email</h2>
              </div>
              <hr />
              <div>
                <h2>Earn Badges</h2>
              </div>
              <hr />
              <div>
                <h2>Fill Out Your Profile</h2>
              </div>
              <hr />
            </div>
          </div>
        </SettingsPageLayout>
        <style jsx>{`
          .forms-container {
            width: 100%;
            max-width: 1008px;
          }
          h1 {
            ${theme.typography.headingLG}
            text-align: center;
            margin-bottom: 20px;
          }
          .tutorials-container {
            width: 100%;
            padding: 25px;
            background-color: ${theme.colors.white};
            box-shadow: 0 0 5px 3px rgba(0, 0, 0, 0.05);
          }
        `}</style>
      </>
    </AuthGate>
  )
}

Tutorials.getInitialProps = async () => ({
  namespacesRequired: ['common', 'tutorials'],
})

export default withApollo(Tutorials)
