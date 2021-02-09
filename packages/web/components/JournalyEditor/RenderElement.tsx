import React from 'react'
import { renderElementTable } from '@udecode/slate-plugins'
import { RenderElementProps } from 'slate-react'

const RenderElement = ({ attributes, children, element }: RenderElementProps) => {
  if (typeof element.type === 'string' && ['table', 'td', 'th', 'tr'].includes(element.type)) {
    const tableElement = renderElementTable()({ attributes, children, element })
    if (tableElement) {
      return tableElement
    }
  }

  switch (element.type) {
    case 'block-quote':
      return <blockquote {...attributes}>{children}</blockquote>
    case 'bulleted-list':
      return <ul {...attributes}>{children}</ul>
    case 'heading-two':
      return <h2 {...attributes}>{children}</h2>
    case 'link':
      return (
        <a {...attributes} href={element.url as string}>
          {children}
        </a>
      )
    case 'list-item':
      return <li {...attributes}>{children}</li>
    case 'numbered-list':
      return <ol {...attributes}>{children}</ol>
    default:
      return <p {...attributes}>{children}</p>
  }
}

export default RenderElement
