import * as React from 'react'
interface SVGRProps {
  title?: string;
  titleId?: string;
}

function FlagDEIcon({ title, titleId, ...props }: React.SVGProps<SVGSVGElement> & SVGRProps) {
  return (
    <svg viewBox="0 0 5 3" aria-labelledby={titleId} {...props}>
      {title ? <title id={titleId}>{title}</title> : null}
      <path d="M0 0h5v3H0z" />
      <path fill="#D00" d="M0 1h5v2H0z" />
      <path fill="#FFCE00" d="M0 2h5v1H0z" />
    </svg>
  )
}

export default FlagDEIcon
