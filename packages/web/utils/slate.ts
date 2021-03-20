import {
  Editor,
  BaseElement,
  Node,
  ImageElement,
  LinkElement,
  TableFamilyElement,
} from 'slate'

import { ElementWithAttributes } from '@udecode/slate-plugins'

declare module 'slate' {
  interface CustomText {
    bold?: boolean
    italic?: boolean
    underline?: boolean
  }

  type CustomBaseElement = {
    type?: string
  }

  type LinkElement = {
    type: 'link'
    url: string
  } 

  type ImageElement = {
    type: 'image'
    url: string
    uploaded: boolean
  } 

  type TableFamilyElement = {
    type: 'table' | 'tr' | 'td' | 'th'
  }

  type CustomElement = 
    | CustomBaseElement
    | LinkElement
    | ImageElement

  type CustomNode =
    | Editor
    | Text
    | CustomElement

  interface CustomTypes {
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
  ImageNode,
  LinkNode,
}

export {
  isImageNode,
  isLinkNode,
  isTableFamilyNode,
}
