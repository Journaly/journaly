import React from 'react'
import { I18nContext } from 'react-i18next'
import { i18n } from '../../config/i18n'

import Button, { ButtonVariant } from '../../elements/Button'

import FlagUSIcon from '../Icons/FlagUSIcon'
import FlagDEIcon from '../Icons/FlagDEIcon'

const UILanguageSelect = () => {
  const { i18n: { language } } = React.useContext(I18nContext)
  const uiLangData = [
    { Icon: FlagUSIcon, code: 'en' },
    { Icon: FlagDEIcon, code: 'de' },
  ]

  return (
    <>
      <ul className="flag-list">
        { uiLangData.map(({ Icon, code }) => (
          <li key={code} className={code === language ? 'selected': ''}>
            <Button
              variant={ButtonVariant.Icon}
              onClick={() => i18n.changeLanguage(code)}
            >
              <Icon width={30} />
            </Button>
          </li>
        ))}
      </ul>

      <style jsx>{`
        .flag-list {
          display: flex;
          align-items: center;
        }

        .flag-list > li {
          margin-right: 5px;
        }

        .flag-list > li.selected {
          box-shadow: 2px 2px 3px rgba(0,0,0,.5);
        }
      `}</style>
    </>
  )
}
export default UILanguageSelect
