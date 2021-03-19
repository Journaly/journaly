import React from 'react'
import { renderElementTable } from '@udecode/slate-plugins'
import { RenderElementProps } from 'slate-react'

import { isImageNode, isLinkNode, isTableFamilyNode } from '@/utils/slate'

const RenderElement = ({ attributes, children, element }: RenderElementProps) => {
  if (isTableFamilyNode(element)) {
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
      return isLinkNode(element) ? (
          <a {...attributes} href={element.url}>
            {children}
          </a>
        ) : null
    case 'list-item':
      return <li {...attributes}>{children}</li>
    case 'numbered-list':
      return <ol {...attributes}>{children}</ol>
    case 'image':
      return isImageNode(element) ? (
        <div {...attributes}>
          <div contentEditable={false}>
            <img src={element.url} />
          </div>
          {children}
        </div>
      ) : null
    default:
      return <p {...attributes}>{children}</p>
  }
}

export default RenderElement
