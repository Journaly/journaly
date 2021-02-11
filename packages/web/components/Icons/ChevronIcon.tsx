import * as React from 'react'
interface SVGRProps {
  title?: string
  titleId?: string
  size?: number
}

function ChevronIcon({
  title,
  titleId,
  size = 50,
  ...props
}: React.SVGProps<SVGSVGElement> & SVGRProps) {
  return (
    <svg height={size} width={size} viewBox="0 0 100 100" aria-labelledby={titleId} {...props}>
      {title ? <title id={titleId}>{title}</title> : null}
      <path d="M50 59.5c-.6 0-1.1-.2-1.6-.6l-17-14c-1.1-.9-1.2-2.5-.3-3.5.9-1.1 2.5-1.2 3.5-.3L50 53.8l15.5-12.7c1.1-.9 2.6-.7 3.5.3.9 1.1.7 2.6-.3 3.5l-17 14c-.6.4-1.2.6-1.7.6z" />
    </svg>
  )
}

export default ChevronIcon
