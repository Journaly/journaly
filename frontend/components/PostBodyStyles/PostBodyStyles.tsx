import React from 'react'
import theme from '../../theme'

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
      }

      .${parentClassName} ul {
        list-style-type: disc;
        list-style-position: inside;
      }

      .${parentClassName} ol {
        list-style-type: decimal;
        list-style-position: inside;
      }

      .${parentClassName} p {
        min-height: 1.5em;
      }

      .${parentClassName} h2 {
        ${theme.typography.headingLG};
      }
    `}</style>
  )
}

export default PostBodyStyles
