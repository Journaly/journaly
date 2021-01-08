import React from 'react'
import { NextPage } from 'next'
import { withApollo } from '@/lib/apollo'
import SettingsPageLayout from '@/components/Layouts/SettingsPageLayout'
import LoadingSpinner from '@/components/Icons/LoadingSpinner'
import DetailsForm from '@/components/Dashboard/Settings/DetailsForm'
import LanguagesForm from '@/components/Dashboard/Settings/LanguagesForm'
import BioForm from '@/components/Dashboard/Settings/BioForm'
import InterestsForm from '@/components/Dashboard/Settings/InterestsForm'
import SocialForm from '@/components/Dashboard/Settings/SocialForm'
import AuthGate from '@/components/AuthGate'
import UILanguageSelect from '@/components/UILanguageSelect'
import { useSettingsFormDataQuery } from '@/generated/graphql'

const ProfileInfo: NextPage = () => {
  const { loading, data, refetch } = useSettingsFormDataQuery()

  return (
    <AuthGate>
      {(currentUser) => {
        if (!data?.languages) return null
        return (
          <SettingsPageLayout>
            <div className="forms-container">
              {loading || !currentUser ? (
                <LoadingSpinner />
              ) : (
                <>
                  <DetailsForm currentUser={currentUser} />
                  <LanguagesForm
                    languages={data.languages}
                    languageRelations={currentUser.languages}
                    refetch={refetch}
                  />
                  <BioForm bio={data?.currentUser?.bio || ''} />
                  <InterestsForm />
                  <SocialForm socialMedia={data.currentUser?.socialMedia} refetch={refetch} />
                  <UILanguageSelect />
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

ProfileInfo.getInitialProps = async () => ({
  namespacesRequired: ['settings', 'common'],
})

export default withApollo(ProfileInfo)
