import * as React from 'react'
interface SVGRProps {
  title?: string;
  titleId?: string;
}

function ImageIcon({ title, titleId, ...props }: React.SVGProps<SVGSVGElement> & SVGRProps) {
  return (
    <svg
      width={24}
      height={24}
      xmlns="http://www.w3.org/2000/svg"
      fillRule="evenodd"
      clipRule="evenodd"
      aria-labelledby={titleId}
      fill="#FFF"
      {...props}
    >
      {title ? <title id={titleId}>{title}</title> : null}
      <path d="M 22 19 H 3 L 7 11.508 L 10 14.556 L 15.013 7 L 22 19 Z M 10.152 16.135 L 7.242 13.179 L 4.668 18 H 20.261 L 14.958 8.892 L 10.152 16.135 Z M 5.5 5 A 2.5 2.5 0 0 1 5.5 10 A 2.5 2.5 0 0 1 5.5 5 Z M 5.5 6 A 1.5 1.5 0 1 1 5.499 9.001 A 1.5 1.5 0 0 1 5.5 6 Z" />
    </svg>
  )
}

export default ImageIcon
