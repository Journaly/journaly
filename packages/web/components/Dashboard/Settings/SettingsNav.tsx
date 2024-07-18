import React from 'react'
import { useTranslation } from '@/config/i18n'
import NavLink from '@/components/NavLink'
import theme from '@/theme'

const SettingsNav: React.FC = () => {
  const { t } = useTranslation('settings')
  const links = {
    profile: t('nav.profile'),
    account: t('nav.account'),
    subscription: t('nav.subscription'),
    tutorials: t('nav.tutorials'),
  }

  return (
    <nav className="settings-nav">
      <ul className="settings-nav-items">
        {Object.entries(links).map(([page, navText]) => {
          return (
            <NavLink href={`/settings/${page}`} key={`${page}-nav-link`}>
              <li className="settings-nav-item">{navText}</li>
            </NavLink>
          )
        })}
      </ul>
      <style jsx>{`
        .settings-nav {
          margin-bottom: 25px;
          padding: 5px 20px 5px 0;
        }
        @media (min-width: ${theme.breakpoints.SM}) {
          .settings-nav {
            margin-right: 25px;
            margin-bottom: 0;
            border-right: 2px dotted #49749c;
          }
        }

        .settings-nav-items {
          display: flex;
          align-items: center;
        }
        @media (min-width: ${theme.breakpoints.SM}) {
          .settings-nav-items {
            display: block;
          }
        }

        .settings-nav-item {
          display: block;
          margin-right: 12px;
          padding: 0 8px 12px;
          border-bottom: 4px solid transparent;
          cursor: pointer;
        }
        @media (min-width: ${theme.breakpoints.SM}) {
          .settings-nav-item {
            margin-right: 0;
            margin-bottom: 10px;
            padding: 0;
            padding-left: 20px;
            border-bottom: 0;
            border-left: 9px solid transparent;
          }
        }

        .settings-nav-item:last-child {
          margin-right: 0;
        }
        @media (min-width: ${theme.breakpoints.SM}) {
          .settings-nav-item:last-child {
            margin-bottom: 0;
          }
        }

        .settings-nav-item.active {
          border-color: ${theme.colors.blueLight};
          pointer-events: none;
        }
      `}</style>
    </nav>
  )
}

export default SettingsNav
