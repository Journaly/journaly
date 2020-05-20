import React from 'react'
import { useTranslation } from '../../../config/i18n'
import NavLink from '../../NavLink'

const SettingsNav: React.FC = () => {
  const { t } = useTranslation('settings')
  const links = {
    profile: t('nav.profile'),
    account: t('nav.account'),
  }

  return (
    <nav className="settings-nav">
      <ul>
        {Object.entries(links).map(([page, navText]) => {
          return (
            <NavLink href={`/dashboard/settings/${page}`} key={`${page}-nav-link`}>
              <li className="settings-nav-item">
                <a>{navText}</a>
              </li>
            </NavLink>
          )
        })}
      </ul>
      <style jsx>{`
        .settings-nav {
          margin-right: 25px;
          padding: 5px 20px 5px 0;
          border-right: 2px dotted #49749c;
        }

        .settings-nav-item {
          display: block;
          margin-bottom: 10px;
          padding-left: 20px;
          border-left: 9px solid transparent;
          cursor: pointer;
        }

        .settings-nav-item:last-child {
          margin-bottom: 0;
        }

        .settings-nav-item.active {
          border-color: #4391c9;
          pointer-events: none;
          cursor: default;
        }
      `}</style>
    </nav>
  )
}

export default SettingsNav
