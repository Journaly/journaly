import * as React from 'react'
interface SVGRProps {
  title?: string;
  titleId?: string;
}

function Feed({
  title,
  titleId,
  ...props
}: React.SVGProps<SVGSVGElement> & SVGRProps) {
  return (
    <svg
      width={25}
      height={18.572}
      viewBox="0 0 25 18.572"
      aria-labelledby={titleId}
      {...props}
    >
      {title ? <title id={titleId}>{title}</title> : null}
      <defs>
        <clipPath id="prefix__a">
          <path
            data-name="Path 244"
            d="M23.958-32.5H3.819a1.106 1.106 0 00-1.042 1.161v.387H1.042A1.106 1.106 0 000-29.792v13.155a2.581 2.581 0 002.431 2.708h20.486A2.212 2.212 0 0025-16.25v-15.089a1.106 1.106 0 00-1.042-1.161zM2.431-16.25a.369.369 0 01-.347-.387v-11.994h.694v11.994a.369.369 0 01-.347.387zm10.243-.774h-6.6a.553.553 0 01-.521-.58v-.387a.553.553 0 01.521-.58h6.6a.553.553 0 01.521.58v.387a.553.553 0 01-.521.58zm9.028 0H15.1a.553.553 0 01-.521-.58v-.387a.553.553 0 01.521-.58h6.6a.553.553 0 01.521.58v.387a.553.553 0 01-.521.58zm-9.028-4.643h-6.6a.553.553 0 01-.521-.58v-.387a.553.553 0 01.521-.58h6.6a.553.553 0 01.521.58v.387a.553.553 0 01-.521.58zm9.028 0H15.1a.553.553 0 01-.521-.58v-.387a.553.553 0 01.521-.58h6.6a.553.553 0 01.521.58v.387a.553.553 0 01-.521.58zm0-4.643H6.076a.553.553 0 01-.521-.58v-1.935a.553.553 0 01.521-.58H21.7a.553.553 0 01.521.58v1.935a.553.553 0 01-.521.58z"
            fill="#4391c9"
            clipRule="evenodd"
          />
        </clipPath>
        <clipPath id="prefix__b">
          <path
            data-name="Path 243"
            d="M0-11.143h25V-39H0z"
            transform="translate(0 39)"
            fill="#4391c9"
          />
        </clipPath>
        <clipPath id="prefix__c">
          <path
            data-name="Rectangle 734"
            fill="#4391c9"
            d="M0 0h25v27.857H0z"
          />
        </clipPath>
        <clipPath id="prefix__d">
          <path
            data-name="Path 242"
            d="M0-39h25v27.857H0z"
            transform="translate(0 39)"
            fill="#4391c9"
            clipRule="evenodd"
          />
        </clipPath>
        <clipPath id="prefix__e">
          <path
            data-name="Path 241"
            d="M0-13.714h25V-33H0z"
            transform="translate(0 33)"
            fill="#4391c9"
          />
        </clipPath>
      </defs>
      <g data-name="Group 340">
        <g
          data-name="Group 339"
          clipPath="url(#prefix__a)"
          transform="translate(0 32.5)"
        >
          <g
            data-name="Group 338"
            transform="translate(0 -37.143)"
            clipPath="url(#prefix__b)"
          >
            <g data-name="Group 337" clipPath="url(#prefix__c)">
              <g data-name="Group 336" clipPath="url(#prefix__d)">
                <g
                  data-name="Group 335"
                  transform="translate(0 4.286)"
                  clipPath="url(#prefix__e)"
                >
                  <path
                    data-name="Path 240"
                    d="M-3.571-7.857h32.143v35H-3.571z"
                    fill="#4391c9"
                  />
                </g>
              </g>
            </g>
          </g>
        </g>
      </g>
    </svg>
  )
}

export default Feed
