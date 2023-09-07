import { useRef, useEffect } from 'react'
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import remarkMentions from 'remark-mentions'

import theme from '@/theme'

type EditableMarkdownProps = {
  body: string
  updatingCommentBody: string
  setUpdatingCommentBody: (arg0: string) => void
  editing?: boolean
}

const EditableMarkdown = ({
  body,
  updatingCommentBody,
  setUpdatingCommentBody,
  editing = false,
}: EditableMarkdownProps) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  // Focus textarea and select content when opening edit mode.
  useEffect(() => {
    if (!editing)
      return

    setTimeout(() => {
      const el = textareaRef.current
      if (el) {
        el.focus()
        el.setSelectionRange(el.value.length, el.value.length)
      }
    }, 0)
  }, [editing])

  return (
    <div className="body-block">
      {editing ? (
        <textarea
          ref={textareaRef}
          value={updatingCommentBody}
          onChange={(e) => setUpdatingCommentBody(e.target.value)}
        />
      ) : (
        <Markdown
          disallowedElements={['img']}
          remarkPlugins={[
            remarkGfm,
            [remarkMentions, { usernameLink: (handle: string) => `/user/${handle}` }],
          ]}
        >
          {body}
        </Markdown>
      )}

      <style jsx>{`
        // MarkDown Styles
        .body-block :global(h1),
        .body-block :global(h2),
        .body-block :global(h3),
        .body-block :global(h4) {
          font-family: inherit;
          font-size: 1.2em;
          font-weight: 600;
          margin: 0.5em 0 0.5em 0;
        }
        .body-block :global(ol > li) {
          list-style: inside;
          list-style-type: decimal;
          margin-left: 10px;
        }
        .body-block :global(ul > li:not(.task-list-item)) {
          list-style: inside;
          list-style-type: disc;
          margin-left: 10px;
        }
        .body-block :global(ul > li > input[type='checkbox']) {
          margin: 0 10px;
        }
        .body-block :global(p) {
          line-height: 1.3em;
        }
        .body-block :global(p:not(:last-child)) {
          margin-bottom: 0.8em;
        }
        .body-block :global(code) {
          background-color: #eee;
          font-family: monospace;
          padding: 2px;
        }
        .body-block :global(blockquote) {
          border-left: 4px solid ${theme.colors.blueLight};
          padding-left: 5px;
          margin: 5px 0;
          background-color: ${theme.colors.gray100};
          font-style: italic;
        }
        .body-block :global(a) {
          color: ${theme.colors.blueLight};
        }
        .body-block :global(a:hover) {
          cursor: pointer;
          text-decoration: underline;
        }

        textarea {
          flex: 1;
          width: 100%;
          outline: none;
          padding: 5px;
          margin-right: 10px;
          background-color: transparent;
          resize: vertical;
          border: 1px solid ${theme.colors.gray400};
          border-radius: 5px;
        }
      `}</style>
    </div>
  )
}

export default EditableMarkdown
