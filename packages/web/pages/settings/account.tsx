import React from 'react'
import { NextPage } from 'next'
import { withApollo } from '@/lib/apollo'
import useUILanguage from '@/hooks/useUILanguage'
import SettingsPageLayout from '@/components/Layouts/SettingsPageLayout'
import AuthGate from '@/components/AuthGate'
import LoadingSpinner from '@/components/Icons/LoadingSpinner'
import UpdatePasswordForm from '@/components/Dashboard/Settings/UpdatePasswordForm'
import NotificationSettingsForm from '@/components/Dashboard/Settings/NotificationSettingsForm'
import UILanguageForm from '@/components/Dashboard/Settings/UILanguageForm'
import { useSettingsFormDataQuery } from '@/generated/graphql'

const Account: NextPage = () => {
  const uiLanguage = useUILanguage()
  const { loading, data, refetch } = useSettingsFormDataQuery({
    variables: { uiLanguage },
  })

  return (
    <AuthGate>
      {() => {
        return (
          <SettingsPageLayout>
            <div className="forms-container">
              {loading || !data?.currentUser ? (
                <LoadingSpinner />
              ) : (
                <>
                  <UpdatePasswordForm />
                  <UILanguageForm />
                  <NotificationSettingsForm
                    userConfiguration={data.currentUser.configuration!}
                    refetch={refetch}
                  />
                </>
              )}
            </div>
            <style jsx>{`
              .forms-container {
                width: 100%;
                max-width: 1008px;
              }

              .forms-container :global(form) {
                margin-bottom: 40px;
              }

              .forms-container :global(form):last-child {
                margin-bottom: 0;
              }
            `}</style>
          </SettingsPageLayout>
        )
      }}
    </AuthGate>
  )
}

Account.getInitialProps = async () => ({
  namespacesRequired: ['common', 'settings'],
})

export default withApollo(Account)
