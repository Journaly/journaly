import isUrl from 'is-url'
import { Editor, Transforms, Element as SlateElement, Range } from 'slate'

const validateProtocol = (href: string) => {
  const httpStr = 'http://'
  const httpsStr = 'https://'
  if (
    href.substr(0, httpStr.length).toLowerCase() !== httpStr &&
    href.substr(0, httpsStr.length).toLowerCase() !== httpsStr
  )
    return `${httpsStr}${href}`

  return href
}

export const isLinkActive = (editor: Editor) => {
  const [link] = Editor.nodes(editor, {
    match: (n) => !Editor.isEditor(n) && SlateElement.isElement(n) && n.type === 'link',
  })
  return !!link
}

const unwrapLink = (editor: Editor) => {
  Transforms.unwrapNodes(editor, {
    match: (n) => !Editor.isEditor(n) && SlateElement.isElement(n) && n.type === 'link',
  })
}

const wrapLink = (editor: Editor, url: string) => {
  if (isLinkActive(editor)) {
    unwrapLink(editor)
  }

  const { selection } = editor
  const isCollapsed = selection && Range.isCollapsed(selection)
  const link = {
    type: 'link',
    url,
    children: isCollapsed ? [{ text: url }] : [],
  }

  if (isCollapsed) {
    Transforms.insertNodes(editor, link)
  } else {
    Transforms.wrapNodes(editor, link, { split: true })
    Transforms.collapse(editor, { edge: 'end' })
  }
}

export const withLinks = (editor: Editor) => {
  const { insertData, insertText, isInline } = editor

  editor.isInline = (element) => {
    return element.type === 'link' ? true : isInline(element)
  }

  editor.insertText = (text) => {
    if (text && isUrl(text)) {
      wrapLink(editor, text)
    } else {
      insertText(text)
    }
  }

  editor.insertData = (data: SlateElement) => {
    const text = data.getData('text/plain')

    if (text && isUrl(text)) {
      wrapLink(editor, text)
    } else {
      insertData(data)
    }
  }

  return editor
}

export const toggleLink = (editor: Editor) => {
  let url: string | undefined | null = window.prompt('Enter the URL of the link:')
  if (!url) return

  url = validateProtocol(url)
  if (!isUrl(url)) return

  if (editor.selection) {
    wrapLink(editor, url)
  }
}
