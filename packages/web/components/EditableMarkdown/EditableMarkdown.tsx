import { useRef, useEffect } from 'react'
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import remarkMentions from 'remark-mentions'

import theme from '@/theme'
import rehypeSuggestions from '@/utils/rehypeSuggestions'

type EditableMarkdownProps = {
  body: string
  updatingCommentBody: string
  setUpdatingCommentBody: (arg0: string) => void
  editing?: boolean
  baseContent?: string
  isPostAuthor: boolean
  currentContentInPost: string | null
}

const EditableMarkdown = ({
  body,
  updatingCommentBody,
  setUpdatingCommentBody,
  editing = false,
  baseContent,
  isPostAuthor,
  currentContentInPost,
}: EditableMarkdownProps) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  // Focus textarea and select content when opening edit mode.
  useEffect(() => {
    if (!editing) return

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
          // TODO (This PR) figure out this type
          rehypePlugins={[
            ...(baseContent
              ? [
                  [rehypeSuggestions, { baseContent, currentContentInPost, isPostAuthor }] as [
                    typeof rehypeSuggestions,
                    { baseContent: string; currentContentInPost: string; isPostAuthor: boolean },
                  ],
                ]
              : []),
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

        // Styles for suggestions
        .body-block :global(.suggestion) {
          margin: 8px 0;
          border-radius: 5px;
          overflow: hidden;
          padding: 5px 5px;
          border: 1px solid ${theme.colors.gray400};
          border-radius: 5px;
          background-color: ${theme.colors.gray100};
        }
        .body-block :global(.suggestion.accepted .suggestion-accepted-text) {
          color: ${theme.colors.greenDark};
          font-weight: 600;
        }
        .body-block :global(.suggestion > .header) {
          display: flex;
          justify-content: space-between;
          align-items: center;
          line-height: 1.2;
          font-size: 12px;
          padding: 4px 8px 8px;
        }
        .body-block :global(.suggestion > .header > span) {
          font-weight: 400;
          color: ${theme.colors.gray600};
          text-align: left;
          font-style: italic;
        }
        .body-block :global(.suggestion > code) {
          padding: 0;
          text-wrap: wrap;
        }
        .body-block :global(.old-string) {
          background: ${theme.colors.redHighlight};
          padding: 2px 8px;
          border-radius: 4px 4px 0 0;
        }
        .body-block :global(.new-string) {
          background: ${theme.colors.greenHighlight};
          padding: 2px 8px;
          border-radius: 0 0 4px 4px;
        }
        .body-block :global(.add) {
          font-weight: 600;
          color: ${theme.colors.greenDark};
        }
        .body-block :global(.del) {
          font-weight: 600;
          text-decoration: line-through;
          color: ${theme.colors.red};
        }
        // "Apply Suggestion" button styles.
        // Button has to be styled separately
        // due to how it is rendered and not
        // being a React component.
        .body-block :global(.apply-suggestion-btn) {
          appearance: none;
          border: none;
          margin: 0;
          padding: 4px 8px;
          font-size: 12px;
          font-weight: 600;
          border-radius: 4px;
          color: ${theme.colors.white};
          background-color: ${theme.colors.blueLight};
          /* background-color: ${theme.colors.charcoal}; */
          cursor: pointer;
          white-space: nowrap;
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
