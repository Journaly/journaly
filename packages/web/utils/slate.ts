import {
  BaseEditor,
  BaseElement,
  Node,
  ImageElement,
  LinkElement,
  TableFamilyElement,
} from 'slate'

import { ReactEditor } from 'slate-react'
import { HistoryEditor } from 'slate-history'

import { ElementWithAttributes } from '@udecode/slate-plugins'

declare module 'slate' {
  interface CustomText {
    text: string
    bold?: boolean
    italic?: boolean
    underline?: boolean
  }

  type CustomBaseElement = BaseElement & {
    type?: string
  }

  type LinkElement = {
    type: 'link'
    url: string
  } & CustomBaseElement

  type ImageElement = {
    type: 'image'
    url: string
    uploaded: boolean
  } 

  type TableFamilyElement = {
    type: 'table' | 'tr' | 'td' | 'th'
  }

  type CustomEditor = BaseEditor & ReactEditor & HistoryEditor

  type CustomElement = 
    | CustomBaseElement
    | LinkElement
    | ImageElement

  type CustomNode =
    | CustomEditor
    | Text
    | CustomElement

  interface CustomTypes {
    Editor: CustomEditor
    Element: CustomElement
    Node: CustomNode
    Text: CustomText
  }
}

type ImageNode = ImageElement & BaseElement
type LinkNode = LinkElement & BaseElement
type TableFamilyNode = TableFamilyElement & ElementWithAttributes & BaseElement

const isImageNode = (arg: Node): arg is ImageNode => {
  return 'type' in arg && arg.type === 'image'
}

const isLinkNode = (arg: Node): arg is LinkNode => {
  return 'type' in arg && arg.type === 'link'
}

const isTableFamilyNode = (arg: Node): arg is TableFamilyNode => {
  return 'type' in arg && ['table', 'td', 'th', 'tr'].includes(arg.type || '')
}

export type {
  LinkElement,
  ImageNode,
  LinkNode,
}

export {
  isImageNode,
  isLinkNode,
  isTableFamilyNode,
}
