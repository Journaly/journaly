import Link from 'next/link'
import theme from '@/theme'

const Logo = () => (
  <Link href="/">
    <a>
      Journaly
      <style jsx>
        {`
          font-family: 'Playfair Display', serif;
          font-size: 24px;
          color: ${theme.colors.white};

          @media (max-width: 370px) {
            font-size: 22px;
          }
        `}
      </style>
    </a>
  </Link>
)

export default Logo
