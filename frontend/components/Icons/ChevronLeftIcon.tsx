import * as React from 'react'
interface SVGRProps {
  title?: string;
  titleId?: string;
}

function ChevronLeftIcon({ title, titleId, ...props }: React.SVGProps<SVGSVGElement> & SVGRProps) {
  return (
    <svg viewBox="0 0 100 100" aria-labelledby={titleId} {...props}>
      {title ? <title id={titleId}>{title}</title> : null}
      <path d="M40.5 50c0-.6.2-1.1.6-1.6l14-17c.9-1.1 2.5-1.2 3.5-.3 1.1.9 1.2 2.5.3 3.5L46.2 50l12.7 15.4c.9 1.1.7 2.6-.3 3.5-1.1.9-2.6.7-3.5-.3l-14-17c-.4-.4-.6-1-.6-1.6z" />
    </svg>
  )
}

export default ChevronLeftIcon
