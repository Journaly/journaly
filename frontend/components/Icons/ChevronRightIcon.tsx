import * as React from 'react'
interface SVGRProps {
  title?: string;
  titleId?: string;
}

function ChevronRightIcon({ title, titleId, ...props }: React.SVGProps<SVGSVGElement> & SVGRProps) {
  return (
    <svg viewBox="0 0 100 100" aria-labelledby={titleId} {...props}>
      {title ? <title id={titleId}>{title}</title> : null}
      <path d="M60.5 50c0 .6-.2 1.1-.6 1.6l-14 17c-.9 1.1-2.5 1.2-3.5.3s-1.2-2.5-.3-3.5L54.8 50 42.1 34.6c-.9-1.1-.7-2.6.3-3.5 1.1-.9 2.6-.7 3.5.3l14 17c.4.5.6 1.1.6 1.6z" />
    </svg>
  )
}

export default ChevronRightIcon
