import isUrl from 'is-url'
import {
  Editor,
  Transforms,
  Element as SlateElement,
  Range,
} from 'slate'
import { ReactEditor } from 'slate-react'
import { toast } from 'react-toastify'
import { DEFAULTS_TABLE, setDefaults, someNode, insertTable } from '@udecode/slate-plugins'

export type ButtonType = 'block' | 'link' | 'table'
export type MarkType = 'bold' | 'underline' | 'italic'

/*
// TODO: Actually type `isXActive` functions
type MarkType =
  | 'bold'
  | 'italic'
  | 'underline'

type ElementType =
  | 'heading-one'
  | 'heading-two'
  | 'block-quote'
  | 'bulleted-list'
  | 'numbered-list'
  | 'list-item'
  | 'link'
  | 'paragraph'
  | 'table'
  | 'td'
  | 'tr'
  | 'th'
  */


type IsTypeActiveArgs = {
  type: ButtonType
  editor: Editor
  format: string
}

type ToggleByTypeArgs = {
  type: ButtonType
  editor: Editor
  format: string
  t?: (key: string) => string
}

type ToggleArgs = Omit<ToggleByTypeArgs, 'type'>

export const options = setDefaults(DEFAULTS_TABLE, {})

const LIST_TYPES = ['numbered-list', 'bulleted-list']

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

export const isMarkActive = (editor: Editor, type: MarkType) => {
  const marks = Editor.marks(editor) as { [key: string]: boolean | undefined }
  return marks ? marks[type] === true : false
}

const isBlockActive = (editor: Editor, format: string) => {
  const [match] = Editor.nodes(editor, {
    match: (n) => (
      !Editor.isEditor(n) &&
      SlateElement.isElement(n) &&
      n.type === format
    ),
  })

  return !!match
}

const isLinkActive = (editor: Editor) => isBlockActive(editor, 'link')

export const isTableActive = (editor: Editor) => {
  return someNode(editor, { match: { type: options.table.type } })
}

export const tableHandler = ({ editor, format }: ToggleArgs) => {
  const tableActions = {
    'insert-table': insertTable,
  }

  const tableFormatKey = format as keyof typeof tableActions
  if (tableActions[tableFormatKey]) {
    tableActions[tableFormatKey](editor, options)
  }
}

export const isTypeActive = ({ type, editor, format }: IsTypeActiveArgs) => {
  const fn = {
    block: isBlockActive,
    link: isLinkActive,
    table: isTableActive,
  }[type]

  return fn(editor, format)
}

const toggleBlock = ({ editor, format }: ToggleArgs) => {
  const isActive = isBlockActive(editor, format)
  const isList = LIST_TYPES.includes(format)

  Transforms.unwrapNodes(editor, {
    match: (n) => (
      !Editor.isEditor(n) &&
      SlateElement.isElement(n) &&
      LIST_TYPES.includes(n.type as string)
    ),
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

export const toggleMark = (editor: Editor, type: MarkType) => {
  if (isMarkActive(editor, type)) {
    Editor.removeMark(editor, type)
  } else {
    Editor.addMark(editor, type, true)
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
  const enterUrlPrompt = t ? t('enterUrlPrompt') : 'Enter the URL of the link:'
  let url: string | undefined | null = window.prompt(enterUrlPrompt)
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

export const withLinks = (editor: ReactEditor) => {
  const { insertText, isInline } = editor

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

  return editor
}

const dataUrlizeFile = (file: File): Promise<string> => {
  const reader = new FileReader()
  return (new Promise((res, rej) => {
    reader.addEventListener('load', () => {
      if (reader.result) {
        // `results`'s type depends on what `.read*` method was called, in this
        // case `.readAsDataURL()` ensures we're getting a string, but there's
        // no direct way to express that in the type system, so assert here.
        res(reader.result as string)
      } else {
        rej()
      }
    })

    reader.readAsDataURL(file)
  }))

}

export const insertImage = async (editor: ReactEditor, file: File) => {
  const url = await dataUrlizeFile(file)

  const image = {
    type: 'image',
    url,
    uploaded: false,
    children: [{ text: '' }]
  }
  Transforms.insertNodes(editor, image)
}

export const withImages = (editor: ReactEditor) => {
  const { insertData, isVoid } = editor

  editor.isVoid = element => {
    return element.type === 'image' ? true : isVoid(element)
  }

  editor.insertData = data => {
    const { files } = data

    if (files && files.length > 0) {
      for (const file of files) {
        const [mime] = file.type.split('/')

        if (mime === 'image') {
          insertImage(editor, file)
        }
      }
    } else {
      insertData(data)
    }
  }

  return editor
  
}

export const toogleByType = ({ type, editor, format, t }: ToggleByTypeArgs) => {
  const toggles = {
    block: toggleBlock,
    link: toggleLink,
    table: tableHandler,
  }

  toggles[type]({ editor, format, t })
}
