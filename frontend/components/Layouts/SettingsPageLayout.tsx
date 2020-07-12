import React from 'react'
import DashboardLayout from './DashboardLayout'
import Breadcrumbs from '../Dashboard/Settings/Breadcrumbs'
import SettingsNav from '../Dashboard/Settings/SettingsNav'
import theme from '../../theme'

interface Props {
  children: React.ReactNode
}

const SettingsPageLayout: React.FC<Props> = ({ children }) => {
  return (
    <DashboardLayout>
      <Breadcrumbs />

      <div className="settings-container">
        <SettingsNav />

        {children}
      </div>

      <style jsx>{`
        .settings-container {
          display: flex;
          flex-direction: column;
          margin-top: 35px;
        }
        @media (min-width: ${theme.breakpoints.SM}) {
          .settings-container {
            flex-direction: row;
            margin-top: 65px;
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
