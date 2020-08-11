import React from 'react'
import { NextPage } from 'next'
import { withApollo } from '../../../lib/apollo'
import SettingsPageLayout from '../../../components/Layouts/SettingsPageLayout'
import DetailsForm from '../../../components/Dashboard/Settings/DetailsForm'
import LanguagesForm from '../../../components/Dashboard/Settings/LanguagesForm'
import BioForm from '../../../components/Dashboard/Settings/BioForm'
import InterestsForm from '../../../components/Dashboard/Settings/InterestsForm'
import SocialForm from '../../../components/Dashboard/Settings/SocialForm'
import AuthGate from '../../../components/AuthGate'

const ProfileInfo: NextPage = () => {
  return (
    <AuthGate>
      {(currentUser) => (
        <SettingsPageLayout>
          <div className="forms-container">
            <DetailsForm currentUser={currentUser} />
            <LanguagesForm />
            <BioForm />
            <InterestsForm />
            <SocialForm />
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
      )}
    </AuthGate>
  )
}

ProfileInfo.getInitialProps = async () => ({
  namespacesRequired: ['settings', 'common'],
})

export default withApollo(ProfileInfo)
