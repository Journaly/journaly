import isUrl from 'is-url'
import { Editor, Transforms, Element as SlateElement, Range } from 'slate'
import { toast } from 'react-toastify'
import { TFunction } from 'next-i18next'

export type ButtonType = 'mark' | 'block' | 'link'

const LIST_TYPES = ['numbered-list', 'bulleted-list']

type CheckIfTypeIsActiveArgs = {
  type: ButtonType
  editor: Editor
  format: string
}

type ToggleByTypeArgs = {
  type: ButtonType
  editor: Editor
  format: string
  t?: TFunction
}

type ToggleArgs = Omit<ToggleByTypeArgs, 'type'>

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

const unwrapLink = (editor: Editor) => {
  Transforms.unwrapNodes(editor, {
    match: (n) => !Editor.isEditor(n) && SlateElement.isElement(n) && n.type === 'link',
  })
}

const isLinkActive = (editor: Editor) => {
  const [link] = Editor.nodes(editor, {
    match: (n) => !Editor.isEditor(n) && SlateElement.isElement(n) && n.type === 'link',
  })
  return !!link
}

const isMarkActive = (editor: Editor, format: string) => {
  const marks = Editor.marks(editor)
  return marks ? marks[format] === true : false
}

const isBlockActive = (editor: Editor, format: string) => {
  const [match] = Editor.nodes(editor, {
    match: (n) => n.type === format,
  })

  return !!match
}

export const isTypeActive = ({ type, editor, format }: CheckIfTypeIsActiveArgs) => {
  const fn = {
    mark: isMarkActive,
    block: isBlockActive,
    link: isLinkActive,
  }[type]

  return fn(editor, format)
}

const toggleBlock = ({ editor, format }: ToggleArgs) => {
  const isActive = isBlockActive(editor, format)
  const isList = LIST_TYPES.includes(format)

  Transforms.unwrapNodes(editor, {
    match: (n) => LIST_TYPES.includes(n.type),
    split: true,
  })

  Transforms.setNodes(editor, {
    type: isActive ? 'paragraph' : isList ? 'list-item' : format,
  })

  if (!isActive && isList) {
    const block = { type: format, children: [] }
    Transforms.wrapNodes(editor, block)
  }
}

export const toggleMark = ({ editor, format }: ToggleArgs) => {
  const isActive = isMarkActive(editor, format)

  if (isActive) {
    Editor.removeMark(editor, format)
  } else {
    Editor.addMark(editor, format, true)
  }
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

const toggleLink = ({ editor, t }: ToggleArgs) => {
  let url: string | undefined | null = window.prompt('Enter the URL of the link:')
  if (!url) return

  url = validateProtocol(url)
  if (!isUrl(url)) {
    t && toast.error(t('websitePatternError'))
    return
  }

  if (editor.selection) {
    wrapLink(editor, url)
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

export const toogleByType = ({ type, editor, format, t }: ToggleByTypeArgs) => {
  const toggles = {
    mark: toggleMark,
    block: toggleBlock,
    link: toggleLink,
  }

  toggles[type]({ editor, format, t })
}
