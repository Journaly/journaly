import React, { useEffect, useRef } from 'react'
import TextArea from '@/components/Textarea'

export const MENTION_KEY_CHAR = '@'

const MarkdownEditor = (props: React.ComponentProps<typeof TextArea>) => {
  const textExpanderRef = useRef()

  useEffect(() => {
    import('@github/text-expander-element')

    const handleTextExpanderChange = (event: any) => {
      console.log(event)
      const { key, provide, text } = event.detail
      if (key !== MENTION_KEY_CHAR) return
      console.log('provide ready')
      provide(
        (async () => {
          const fragment = document.createElement('ul')
          fragment.classList.add('user-name-search')
          ;['foo', 'bee', 'bar'].forEach((item) => {
            console.log(item)
            const el = document.createElement('li')
            el.role = 'option'
            el.dataset.value = item
            el.textContent = item

            fragment.appendChild(el)
          })

          console.log('frag', fragment)

          return {
            fragment,
            matched: true,
          }
        })(),
      )
    }

    if (textExpanderRef.current) {
      textExpanderRef.current.addEventListener('text-expander-change', handleTextExpanderChange)
    }
  }, [])

  return (
    // TODO: In the future, we could potentially use `#` for the `multiword` arg
    // as a way to mention Groups?
    <div className="text-expander-container">
      <text-expander keys={MENTION_KEY_CHAR} ref={textExpanderRef}>
        <TextArea {...props} />
      </text-expander>
      <style jsx>
        {`
          .text-expander-container {
            position: relative;
          }

          :global(.user-name-search) {
            position: absolute;
            z-index: 1;
            background: white;
            border: 1px solid black;
            border-radius: 5px;
            min-width: 250px;
          }
        `}
      </style>
    </div>
  )
}

export default MarkdownEditor
