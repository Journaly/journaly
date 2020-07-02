import React from 'react'
import DashboardLayout from './DashboardLayout'
import Breadcrumbs from '../Dashboard/Settings/Breadcrumbs'
import SettingsNav from '../Dashboard/Settings/SettingsNav'
import theme from '../../theme'
import { User as UserType } from '../../generated/graphql'

interface Props {
  currentUser: UserType
  children: React.ReactNode
}

const SettingsPageLayout: React.FC<Props> = ({ currentUser, children }) => {
  return (
    <DashboardLayout currentUser={currentUser}>
      <Breadcrumbs />

      <div className="settings-container">
        <SettingsNav />

        {children}
      </div>

      <style jsx>{`
        .settings-container {
          display: flex;
          flex-direction: column;
          margin: 35px 0;
        }
        @media (min-width: ${theme.breakpoints.SM}) {
          .settings-container {
            flex-direction: row;
            margin: 65px 0;
          }
        }

        .settings-container :global(.settings-nav) {
          flex-shrink: 0;
          align-self: flex-start;
        }
      `}</style>
    </DashboardLayout>
  )
}

export default SettingsPageLayout
