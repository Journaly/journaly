import { useCurrentUserQuery, User as UserType } from '@/generated/graphql'
import { useTranslation } from '@/config/i18n'
import { width, darkGrey } from '@/utils'
import NavLink from '@/components/NavLink'
import Logo from '@/components/Logo'

const Nav = () => {
  const { t } = useTranslation('common')
  const { data } = useCurrentUserQuery()
  const currentUser = data?.currentUser as UserType

  return (
    <div>
      <div className="header-container">
        <Logo />

        <ul className="nav-items">
          <NavLink href="/about">
            <a className="nav-link">{t('home.nav.about')}</a>
          </NavLink>
          <NavLink href="/blog/introducing-journaly">
            <a className="nav-link">{t('home.nav.blog')}</a>
          </NavLink>
          {currentUser ? (
            <NavLink href="/dashboard/my-feed">
              <a className="nav-link">{t('home.nav.dashboard')}</a>
            </NavLink>
          ) : (
            <>
              <NavLink href="/dashboard/login">
                <a className="nav-link">{t('home.nav.logIn')}</a>
              </NavLink>
              <NavLink href="/dashboard/signup">
                <a className="nav-link">{t('home.nav.signUp')}</a>
              </NavLink>
            </>
          )}
        </ul>
      </div>
      <style jsx>{`
        background-color: black;

        .header-container {
          display: flex;
          justify-content: space-between;
          align-items: center;
          height: 72px;
          max-width: ${width.desktopHD}px;
          margin: 0 auto;
          padding: 0 20px;
        }

        .nav-items {
          display: flex;
          align-items: center;
          height: 100%;
        }

        .nav-link {
          display: flex;
          align-items: center;
          height: 100%;
          padding: 0 10px;
          color: #ffffff;
        }

        .nav-link.active {
          background-color: ${darkGrey};
        }

        .nav-link:last-child {
          margin-right: 0;
        }
      `}</style>
    </div>
  )
}

export default Nav
