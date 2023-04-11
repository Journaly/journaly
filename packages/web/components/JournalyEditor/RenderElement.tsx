import React from 'react'
//import { renderElementTable } from '@udecode/plate'
import { useSelected, RenderElementProps } from 'slate-react'

import { isImageNode, isLinkNode } from '@/utils/slate'

const ImageElement = ({ attributes, element, children }: RenderElementProps) => {
  const selected = useSelected()

  return isImageNode(element) ? (
    <div {...attributes} className="embedded-image">
      <div contentEditable={false}>
        <img src={element.url} />
      </div>
      {children}
      <style jsx>{`
        .embedded-image img {
          box-shadow: ${selected ? '0 0 0 3px #B4D5FF' : 'none'};
        }
      `}</style>
    </div>
  ) : null
}

const RenderElement = (props: RenderElementProps) => {
  const { attributes, children, element } = props

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
      return <ImageElement {...props} />
    default:
      return <p {...attributes}>{children}</p>
  }
}

export default RenderElement
