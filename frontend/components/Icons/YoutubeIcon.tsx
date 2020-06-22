import * as React from 'react'
interface SVGRProps {
  title?: string;
  titleId?: string;
}

function YoutubeIcon({ title, titleId, ...props }: React.SVGProps<SVGSVGElement> & SVGRProps) {
  return (
    <svg width={60} height={60} viewBox="0 0 60 60" aria-labelledby={titleId} {...props}>
      {title ? <title id={titleId}>{title}</title> : null}
      <g data-name="Group 437">
        <g data-name="Ellipse 5" fill="none" stroke="#fff" strokeWidth={2}>
          <circle cx={30} cy={30} r={30} stroke="none" />
          <circle cx={30} cy={30} r={29} />
        </g>
        <path
          data-name="Path 259"
          d="M44.983 27.203q-.016-.9-.142-2.285a20.784 20.784 0 00-.36-2.469 3.893 3.893 0 00-1.163-2.059 3.568 3.568 0 00-2.084-.971A109.83 109.83 0 0030 19a109.826 109.826 0 00-11.233.418 3.53 3.53 0 00-2.076.971 3.915 3.915 0 00-1.155 2.06 18.529 18.529 0 00-.377 2.469q-.125 1.381-.142 2.285T15 29.712q0 1.607.017 2.511t.142 2.289a20.707 20.707 0 00.36 2.47 3.891 3.891 0 001.163 2.059 3.57 3.57 0 002.084.971A109.72 109.72 0 0030 40.429a109.721 109.721 0 0011.233-.417 3.53 3.53 0 002.076-.971 3.916 3.916 0 001.155-2.059 18.541 18.541 0 00.377-2.47q.125-1.381.142-2.285T45 29.712q0-1.6-.017-2.509zm-9.057 3.415l-8.571 5.357a.955.955 0 01-.569.167 1.158 1.158 0 01-.519-.134 1 1 0 01-.552-.937V24.357a1 1 0 01.552-.937 1.008 1.008 0 011.088.033l8.571 5.359a1.065 1.065 0 010 1.808z"
          fill="#fff"
        />
      </g>
    </svg>
  )
}

export default YoutubeIcon
