import * as React from 'react'
import theme from '@/theme'

interface SVGRProps {
  title?: string
  titleId?: string
}

function NewPostIcon({ title, titleId, ...props }: React.SVGProps<SVGSVGElement> & SVGRProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={25}
      height={25}
      viewBox="0 0 25 25"
      aria-labelledby={titleId}
      {...props}
    >
      {title ? <title id={titleId}>{title}</title> : null}
      <defs>
        <clipPath id="new-post-icon__a">
          <path
            data-name="Path 249"
            d="M24.344-25.06l-2.251 2.251a.586.586 0 01-.83 0l-5.42-5.42a.586.586 0 010-.83l2.251-2.251a2.349 2.349 0 013.316 0l2.935 2.935a2.34 2.34 0 01-.001 3.315zm-10.435-2.066L1.086-14.3.051-8.37a1.173 1.173 0 001.358 1.358l5.933-1.04 12.822-12.823a.587.587 0 000-.83l-5.42-5.42a.592.592 0 00-.835-.001zM6.091-15.4a.681.681 0 010-.967l7.52-7.52a.681.681 0 01.967 0 .681.681 0 010 .967l-7.52 7.52a.681.681 0 01-.967 0zm-1.762 4.105h2.343v1.773l-3.15.552L2-10.489l.552-3.15h1.777z"
            transform="translate(-.033 31.995)"
            fill={theme.colors.blueLight}
            clipRule="evenodd"
          />
        </clipPath>
        <clipPath id="new-post-icon__b">
          <path
            data-name="Path 248"
            d="M0-6.95h25.05V-32H0z"
            transform="translate(0 32)"
            fill={theme.colors.blueLight}
          />
        </clipPath>
        <clipPath id="new-post-icon__c">
          <path data-name="Rectangle 735" fill="#4391c9" d="M0 0h25.05v25.05H0z" />
        </clipPath>
        <clipPath id="new-post-icon__d">
          <path
            data-name="Path 247"
            d="M0-32h25.05v25.05H0z"
            transform="translate(0 32)"
            fill={theme.colors.blueLight}
            clipRule="evenodd"
          />
        </clipPath>
      </defs>
      <g data-name="Group 345" clipPath="url(#new-post-icon__a)">
        <g
          data-name="Group 344"
          transform="translate(-.026 -.004)"
          clipPath="url(#new-post-icon__b)"
        >
          <g data-name="Group 343" clipPath="url(#new-post-icon__c)">
            <g data-name="Group 342" clipPath="url(#new-post-icon__d)">
              <g data-name="Group 341" clipPath="url(#new-post-icon__b)">
                <path
                  data-name="Path 245"
                  d="M-3.914-3.914h32.878v32.878H-3.914z"
                  fill={theme.colors.blueLight}
                />
              </g>
            </g>
          </g>
        </g>
      </g>
    </svg>
  )
}

export default NewPostIcon
