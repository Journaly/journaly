import { useCurrentUserQuery, User as UserType } from '@/generated/graphql'
import { useTranslation } from '@/config/i18n'
import NavLink from '@/components/NavLink'
import Logo from '@/components/Logo'
import theme from '@/theme'

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
            <span className="nav-link">{t('home.nav.about')}</span>
          </NavLink>
          <NavLink href="/pricing">
            <span className="nav-link">{t('home.nav.pricing')}</span>
          </NavLink>
          {currentUser ? (
            <NavLink href="/my-feed">
              <span className="nav-link">{t('home.nav.dashboard')}</span>
            </NavLink>
          ) : (
            <>
              <NavLink href="/login">
                <span className="nav-link">{t('home.nav.logIn')}</span>
              </NavLink>
              <NavLink href="/signup">
                <span className="nav-link">{t('home.nav.signUp')}</span>
              </NavLink>
            </>
          )}
        </ul>
      </div>
      <style jsx>{`
        .header-container {
          display: flex;
          justify-content: space-between;
          align-items: center;
          height: 72px;
          max-width: 1364px;
          margin: 0 auto;
          padding: 0 20px;
          background-color: black;
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
          color: ${theme.colors.white};
        }

        @media (max-width: ${theme.breakpoints.XS}) {
          .nav-link {
            font-size: 14px;
          }
        }

        .nav-link.active {
          background-color: ${theme.colors.gray800};
        }

        .nav-link:last-child {
          margin-right: 0;
        }
      `}</style>
    </div>
  )
}

export default Nav
