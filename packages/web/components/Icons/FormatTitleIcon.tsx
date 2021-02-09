import * as React from 'react'
interface SVGRProps {
  title?: string;
  titleId?: string;
}

function FormatTitleIcon({ title, titleId, ...props }: React.SVGProps<SVGSVGElement> & SVGRProps) {
  return (
    <svg
      fill="#fff"
      height={24}
      viewBox="0 0 24 24"
      width={24}
      aria-labelledby={titleId}
      {...props}
    >
      {title ? <title id={titleId}>{title}</title> : null}
      <path d="M0 0h24v24H0V0z" fill="none" />
      <path d="M5 4v3h5.5v12h3V7H19V4H5z" />
    </svg>
  )
}

export default FormatTitleIcon
