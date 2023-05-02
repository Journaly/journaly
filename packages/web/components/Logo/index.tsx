import Link from 'next/link'
import theme from '@/theme'

const Logo = () => (
  <Link href="/">
    <a className="logo-link">
      Journaly
      <style jsx>
        {`
          .logo-link {
            font-family: 'Playfair Display', serif;
            font-size: 24px;
            color: ${theme.colors.white};

            @media (max-width: 370px) {
              font-size: 22px;
            }
          }
        `}
      </style>
    </a>
  </Link>
)

export default Logo
