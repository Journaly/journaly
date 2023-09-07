import React, { useCallback, useEffect, useRef } from 'react'
import TextArea from '@/components/Textarea'
import { useUserSearchLazyQuery } from '@/generated/graphql'
import theme from '@/theme'
import _ from 'lodash'

export const MENTION_KEY_CHAR = '@'

type MarkdownEditorProps = Omit<React.ComponentProps<typeof TextArea>, 'onChange'> & {
  onChange?: (value: string) => void
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      ['text-expander']: {
        children: React.ReactNode
        keys: string
        ref: React.RefObject<HTMLElement>
      }
    }
  }
}

const MarkdownEditor = React.forwardRef<HTMLTextAreaElement, MarkdownEditorProps>(
  ({ onChange, ...props }: MarkdownEditorProps, ref) => {
    const textExpanderRef = useRef<HTMLElement>(null)
    const [getUsers] = useUserSearchLazyQuery()

    const handleChange = useCallback(
      (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        onChange && onChange(event.target.value)
      },
      [onChange],
    )

    useEffect(() => {
      import('@github/text-expander-element')

      const handleTextExpanderChange = (event: any) => {
        const { key, provide, text } = event.detail

        if (key !== MENTION_KEY_CHAR) return

        provide(
          (async () => {
            const { data } = await getUsers({ variables: { search: text } })

            if (!data?.users) return

            const { users } = data
            const fragment = document.createElement('ul')
            fragment.classList.add('user-name-search')
            fragment.role = 'listbox'

            users.forEach((user) => {
              const el = document.createElement('li')
              el.role = 'option'
              el.dataset.value = `@${user.handle}`
              el.textContent = user.handle

              fragment.appendChild(el)
            })

            return {
              fragment,
              matched: users.length,
            }
          })(),
        )
      }

      const handleTextExpanderValue = (event: any) => {
        const { key, item } = event.detail

        if (key === MENTION_KEY_CHAR) {
          event.detail.value = item.getAttribute('data-value')
        }
      }

      const handleTextExpanderCommitted = (event: any) => {
        const { input } = event.detail
        onChange && onChange(input.value)
      }

      if (textExpanderRef.current) {
        textExpanderRef.current.addEventListener('text-expander-change', handleTextExpanderChange)
        textExpanderRef.current.addEventListener('text-expander-value', handleTextExpanderValue)
        textExpanderRef.current.addEventListener(
          'text-expander-committed',
          handleTextExpanderCommitted,
        )
      }
    }, [])

    return (
      // TODO: In the future, we could potentially use `#` for the `multiword` arg
      // as a way to mention Groups?
      <div className="text-expander-container">
        <text-expander keys={MENTION_KEY_CHAR} ref={textExpanderRef}>
          <TextArea onChange={handleChange} ref={ref} {...props} />
        </text-expander>
        <style jsx>
          {`
            .text-expander-container {
              position: relative;
            }

            .text-expander-container > :global(:first-child) {
              display: block;
            }

            :global(.user-name-search) {
              margin-top: 24px;
              position: absolute;
              z-index: 1;
              background: white;
              border: 1px solid black;
              border-radius: 5px;
              min-width: 250px;
            }

            :global(.user-name-search > li) {
              font-weight: 600;
              border-bottom: 1px solid ${theme.colors.gray500};
            }

            :global(.user-name-search > li:hover) {
              cursor: pointer;
              background: ${theme.colors.highlightColor};
            }

            :global(.user-name-search > li[aria-selected='true']) {
              background: ${theme.colors.highlightColor};
            }
          `}
        </style>
      </div>
    )
  },
)

export default MarkdownEditor
