import React from 'react'
import Link, { LinkProps } from 'next/link'

type TranslationLinkProps = LinkProps & {
  children: React.ReactNode
}

const TranslationLink: React.FC<TranslationLinkProps> = ({ href, children, ...props }) => {
  return (
    <Link href={href} {...props} legacyBehavior>
      <a className="j-link">{children}</a>
    </Link>
  )
}

export default TranslationLink
