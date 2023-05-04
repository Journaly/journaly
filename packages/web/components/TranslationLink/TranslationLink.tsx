import React from 'react'
import Link, { LinkProps } from 'next/link'

const TranslationLink: React.FC<LinkProps> = ({ href, children, ...props }) => {
  return (
    <Link href={href} {...props} legacyBehavior>
      <a className="j-link">{children}</a>
    </Link>
  )
}

export default TranslationLink
