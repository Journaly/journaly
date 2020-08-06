import * as React from 'react'
interface SVGRProps {
  title?: string;
  titleId?: string;
}

function FormatItalicIcon({ title, titleId, ...props }: React.SVGProps<SVGSVGElement> & SVGRProps) {
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
      <path d="M10 4v3h2.21l-3.42 8H6v3h8v-3h-2.21l3.42-8H18V4h-8z" />
    </svg>
  )
}

export default FormatItalicIcon
