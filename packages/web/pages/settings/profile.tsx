import React from 'react'
import { NextPage } from 'next'
import useUILanguage from '@/hooks/useUILanguage'
import SettingsPageLayout from '@/components/Layouts/SettingsPageLayout'
import LoadingSpinner from '@/components/Icons/LoadingSpinner'
import DetailsForm from '@/components/Dashboard/Settings/DetailsForm'
import LanguagesForm from '@/components/Dashboard/Settings/LanguagesForm'
import BioForm from '@/components/Dashboard/Settings/BioForm'
import InterestsForm from '@/components/Dashboard/Settings/InterestsForm'
import SocialForm from '@/components/Dashboard/Settings/SocialForm'
import AuthGate from '@/components/AuthGate'
import {
  CurrentUserDocument,
  SettingsFormDataDocument,
  useSettingsFormDataQuery,
} from '@/generated/graphql'
import { journalyMiddleware } from '@/lib/journalyMiddleware'
import { getUiLanguage } from '@/utils/getUiLanguage'

const ProfileInfo: NextPage = () => {
  const uiLanguage = useUILanguage()
  const { loading, data, refetch } = useSettingsFormDataQuery({
    variables: { uiLanguage },
  })

  return (
    <AuthGate>
      {(currentUser) => {
        if (!data?.languages) return null
        return (
          <SettingsPageLayout>
            <div className="forms-container">
              {loading || !currentUser || !data.currentUser ? (
                <LoadingSpinner />
              ) : (
                <>
                  <DetailsForm currentUser={currentUser} />
                  <LanguagesForm
                    languages={data.languages}
                    languageRelations={currentUser.languages}
                    refetch={refetch}
                  />
                  <BioForm bio={data.currentUser?.bio || ''} />
                  <InterestsForm
                    topics={data.topics}
                    userInterests={data.currentUser?.userInterests}
                    refetch={refetch}
                  />
                  <SocialForm socialMedia={data.currentUser?.socialMedia} refetch={refetch} />
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

ProfileInfo.getInitialProps = async (ctx) => {
  const props = await journalyMiddleware(ctx, async (apolloClient) => {
    await apolloClient.query({
      query: SettingsFormDataDocument,
      variables: {
        uiLanguage: getUiLanguage(ctx),
      },
    })

    await apolloClient.query({
      query: CurrentUserDocument,
    })
  })

  return {
    ...props,
    namespacesRequired: ['common', 'settings', 'badge'],
  }
}

export default ProfileInfo
