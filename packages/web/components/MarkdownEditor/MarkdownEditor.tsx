import React, { useEffect } from 'react'
import TextArea from '@/components/Textarea'

const MarkdownEditor = (props: React.ComponentProps<typeof TextArea>) => {
  useEffect(() => {
    import('@github/text-expander-element')
  }, [])
  // if (typeof window === 'undefined') return null

  return (
    <text-expander keys=": @ #" multiword="#">
      <TextArea {...props} />
    </text-expander>
  )
}

export default MarkdownEditor
