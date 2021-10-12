import React from 'react'
import theme from '@/theme'

type Props = {
  parentClassName: string
}

const PostBodyStyles: React.FC<Props> = ({ parentClassName }: Props) => {
  return (
    <style jsx global>{`
      .${parentClassName} blockquote {
        border-left: 2px solid ${theme.colors.gray800};
        margin: 10px 0;
        padding-left: 10px;
        color: ${theme.colors.gray800};
        font-style: italic;
        font-weight: 600;
      }

      .${parentClassName} ul {
        list-style-type: disc;
        list-style-position: inside;
        padding-left: 15px;
      }

      .${parentClassName} ol {
        list-style-type: decimal;
        list-style-position: inside;
        padding-left: 15px;
      }

      .${parentClassName} li {
        font-size: 18px;
        line-height: 24px;
        font-weight: 300;
      }

      .${parentClassName} p {
        min-height: 1.5em;
        font-weight: 300;
        font-size: 18px;
        line-height: 24px;
      }

      .${parentClassName} a {
        font-size: inherit;
        text-decoration: underline;
        color: ${theme.colors.blueLight};
      }

      .${parentClassName} img {
        max-width: 100%;
        max-height: 75vh;
        margin: 0 auto;
        display: block;
      }

      @media (min-width: ${theme.breakpoints.SM}) {
        .${parentClassName} p {
          font-size: 20px;
          line-height: 28px;
        }

        .${parentClassName} li {
          font-size: 20px;
          line-height: 28px;
        }
      }

      .${parentClassName} h2 {
        ${theme.typography.headingLG};
        margin: 10px 0;
        font-weight: 600;
      }

      @media (min-width: ${theme.breakpoints.SM}) {
        .${parentClassName} h2 {
          ${theme.typography.headingXL};
        }
      }
    `}</style>
  )
}

export default PostBodyStyles
