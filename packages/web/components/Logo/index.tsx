import Link from 'next/link'
import { white } from '@/utils'

const Logo = () => (
  <Link href="/">
    <a>
      Journaly
      <style jsx>
        {`
          font-family: 'Playfair Display', serif;
          font-size: 24px;
          color: ${white};
        `}
      </style>
    </a>
  </Link>
)

export default Logo
