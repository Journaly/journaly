import * as React from 'react'

type FormatTableIconProps = React.SVGProps<SVGSVGElement> & {
  title?: string
  titleId?: string
}

const FormatTableIcon = ({ title, titleId, ...props }: FormatTableIconProps) => {
  return (
    <svg
      height={24}
      viewBox="0 0 24 24"
      width={24}
      fill="#fff"
      color="#fff"
      aria-labelledby={titleId}
      {...props}
    >
      {title ? <title id={titleId}>{title}</title> : null}
      <path
        fill="currentColor"
        d="M3 3v18h18V3H3zm8 16H5v-6h6v6zm0-8H5V5h6v6zm8 8h-6v-6h6v6zm0-8h-6V5h6v6z"
      ></path>
      <path fill="none" d="M0 0h24v24H0z"></path>
    </svg>
  )
}

export default FormatTableIcon
