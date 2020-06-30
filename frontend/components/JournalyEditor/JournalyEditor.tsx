import React, { useMemo, useCallback } from 'react'
import { createEditor, Editor, Transforms, Node } from 'slate'
import {
  Slate,
  Editable,
  withReact,
  useSlate,
  RenderElementProps,
  RenderLeafProps,
} from 'slate-react'
import { withHistory } from 'slate-history'
import isHotkey from 'is-hotkey'
import theme from '../../theme'
import Toolbar from './Toolbar'
import Button from './Button'

/**
 * The Journaly Rich Text Editor
 *   Uses the Slate library to build a delightful
 *   rich text editing experience that allows users
 *   to craft & format beautiful posts themselves.
 *
 * TODOS:
 * 1. Would like to use our ApolloCache once that is set up
 * to temporarily save "in-progress" drafts, which we can clear
 * once they publish or save draft.
 */

type HotKey = 'mod+b' | 'mod+i' | 'mod+u' | 'mod+`'

const HOTKEYS: { [key in HotKey]: string } = {
  'mod+b': 'bold',
  'mod+i': 'italic',
  'mod+u': 'underline',
}

type ButtonProps = {
  format: string
  icon: string
}

const LIST_TYPES = ['numbered-list', 'bulleted-list']

type JournalyEditorProps = {
  value: Node[]
  setValue: (value: Node[]) => void
}

const JournalyEditor: React.FC<JournalyEditorProps> = ({
  value,
  setValue,
}: JournalyEditorProps) => {
  const renderElement = useCallback((props) => <Element {...props} />, [])
  const renderLeaf = useCallback((props) => <Leaf {...props} />, [])
  const editor = useMemo(() => withHistory(withReact(createEditor())), [])

  return (
    <div className="editor-wrapper">
      <div className="editor-container">
        <Slate editor={editor} value={value} onChange={(value) => setValue(value)}>
          <Toolbar>
            <MarkButton format="bold" icon="format_bold" />
            <MarkButton format="italic" icon="format_italic" />
            <MarkButton format="underline" icon="format_underlined" />
            <BlockButton format="heading-two" icon="format_title" />
            <BlockButton format="block-quote" icon="format_quote" />
            <BlockButton format="numbered-list" icon="format_list_numbered" />
            <BlockButton format="bulleted-list" icon="format_list_bulleted" />
          </Toolbar>
          <Editable
            renderElement={renderElement}
            renderLeaf={renderLeaf}
            placeholder="It all started this morning when..."
            spellCheck
            autoFocus
            onKeyDown={(event: React.KeyboardEvent) => {
              Object.entries(HOTKEYS).forEach(([hotkey, mark]) => {
                // Convert React keyboard event to native keyboard event
                if (isHotkey(hotkey, (event as unknown) as KeyboardEvent)) {
                  event.preventDefault()
                  toggleMark(editor, mark)
                }
              })
            }}
          />
        </Slate>
      </div>
      <style jsx>{`
        .editor-container {
          padding: 0 25px;
          border: 1px solid ${theme.colors.black};
          border-radius: 5px;
          min-height: 200px;
          background-color: ${theme.colors.white};
        }

        :global(blockquote) {
          border-left: 2px solid #ddd;
          margin: 10px 0;
          padding-left: 10px;
          color: #aaa;
          font-style: italic;
        }

        :global(ul) {
          list-style-type: disc;
          list-style-position: inside;
        }

        :global(ol) {
          list-style-type: decimal;
          list-style-position: inside;
        }
      `}</style>
    </div>
  )
}

const toggleBlock = (editor: Editor, format: string) => {
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

const toggleMark = (editor: Editor, format: string) => {
  const isActive = isMarkActive(editor, format)

  if (isActive) {
    Editor.removeMark(editor, format)
  } else {
    Editor.addMark(editor, format, true)
  }
}

const isBlockActive = (editor: Editor, format: string) => {
  const [match] = Editor.nodes(editor, {
    match: (n) => n.type === format,
  })

  return !!match
}

const isMarkActive = (editor: Editor, format: string) => {
  const marks = Editor.marks(editor)
  return marks ? marks[format] === true : false
}

const Element: React.FC<RenderElementProps> = ({ attributes, children, element }) => {
  switch (element.type) {
    case 'block-quote':
      return <blockquote {...attributes}>{children}</blockquote>
    case 'bulleted-list':
      return <ul {...attributes}>{children}</ul>
    case 'heading-two':
      return <h2 {...attributes}>{children}</h2>
    case 'list-item':
      return <li {...attributes}>{children}</li>
    case 'numbered-list':
      return <ol {...attributes}>{children}</ol>
    default:
      return <p {...attributes}>{children}</p>
  }
}

const Leaf: React.FC<RenderLeafProps> = ({ attributes, children, leaf }) => {
  if (leaf.bold) {
    children = <strong>{children}</strong>
  }

  if (leaf.italic) {
    children = <em>{children}</em>
  }

  if (leaf.underline) {
    children = <u>{children}</u>
  }

  return <span {...attributes}>{children}</span>
}

const MarkButton: React.FC<ButtonProps> = ({ format, icon }) => {
  const editor = useSlate()

  return (
    <Button
      active={isMarkActive(editor, format)}
      onMouseDown={(event: React.MouseEvent) => {
        event.preventDefault()
        toggleMark(editor, format)
      }}
      iconSrc={`/images/icons/journaly-editor/${icon}.svg`}
      iconAlt={icon.replace(/_/g, ' ')}
    />
  )
}

const BlockButton: React.FC<ButtonProps> = ({ format, icon }) => {
  const editor = useSlate()

  return (
    <Button
      active={isBlockActive(editor, format)}
      onMouseDown={(event) => {
        event.preventDefault()
        toggleBlock(editor, format)
      }}
      iconSrc={`/images/icons/journaly-editor/${icon}.svg`}
      iconAlt={icon.replace(/_/g, ' ')}
    />
  )
}

export default JournalyEditor
