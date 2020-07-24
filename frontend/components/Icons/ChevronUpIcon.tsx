import * as React from 'react'
interface SVGRProps {
  title?: string;
  titleId?: string;
}

function ChevronUpIcon({ title, titleId, ...props }: React.SVGProps<SVGSVGElement> & SVGRProps) {
  return (
    <svg viewBox="0 0 100 100" aria-labelledby={titleId} {...props}>
      {title ? <title id={titleId}>{title}</title> : null}
      <path d="M33 59.5c-.7 0-1.4-.3-1.9-.9-.9-1.1-.7-2.6.3-3.5l17-14c.9-.8 2.3-.8 3.2 0l17 14c1.1.9 1.2 2.5.3 3.5s-2.5 1.2-3.5.3L50 46.2 34.6 58.9c-.5.4-1 .6-1.6.6z" />
    </svg>
  )
}

export default ChevronUpIcon
