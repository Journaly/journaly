import React, { useEffect, useMemo, useCallback } from 'react'
import { createEditor, Editor, Node } from 'slate'
import {
  Slate,
  Editable,
  withReact,
  useSlate,
  RenderElementProps,
  RenderLeafProps,
  ReactEditor,
} from 'slate-react'
import { withHistory } from 'slate-history'
import isHotkey from 'is-hotkey'
import classNames from 'classnames'
import theme from '@/theme'
import PostBodyStyles from '@/components/PostBodyStyles'
import Toolbar from './Toolbar'
import FormatBoldIcon from '@/components/Icons/FormatBoldIcon'
import FormatItalicIcon from '@/components/Icons/FormatItalicIcon'
import FormatUnderlinedIcon from '@/components/Icons/FormatUnderlinedIcon'
import FormatTitleIcon from '@/components/Icons/FormatTitleIcon'
import FormatLinkIcon from '@/components/Icons/FormatLinkIcon'
import FormatQuoteIcon from '@/components/Icons/FormatQuoteIcon'
import FormatListNumberedIcon from '@/components/Icons/FormatListNumberedIcon'
import FormatListBulletedIcon from '@/components/Icons/FormatListBulletedIcon'
import { ButtonType, withLinks, toggleMark, toogleByType, isTypeActive } from './helpers'
import { useTranslation } from '@/config/i18n'

/**
 * The Journaly Rich Text Editor
 *   Uses the Slate library to build a delightful
 *   rich text editing experience that allows users
 *   to craft & format beautiful posts themselves.
 */

type HotKey = 'mod+b' | 'mod+i' | 'mod+u'

const HOTKEYS: { [key in HotKey]: string } = {
  'mod+b': 'bold',
  'mod+i': 'italic',
  'mod+u': 'underline',
}

type ButtonProps = {
  type: ButtonType
  format: string
  children: React.ReactNode
}

type JournalyEditorProps = {
  value: Node[]
  setValue: (value: Node[]) => void
  slateRef: React.RefObject<Editor>
}

const JournalyEditor: React.FC<JournalyEditorProps> = ({
  value,
  setValue,
  slateRef,
}: JournalyEditorProps) => {
  const { t } = useTranslation('common')
  const renderElement = useCallback((props) => <Element {...props} />, [])
  const renderLeaf = useCallback((props) => <Leaf {...props} />, [])
  const editor = useMemo(() => withLinks(withHistory(withReact(createEditor()))), []) as Editor &
    ReactEditor

  useEffect(() => {
    ;(slateRef as React.MutableRefObject<Editor>).current = editor
  }, [editor])

  return (
    <div className="editor-wrapper">
      <div className="editor-container">
        <Slate editor={editor} value={value} onChange={(value) => setValue(value)}>
          <Toolbar>
            <ToolbarButton type="mark" format="bold">
              <FormatBoldIcon title="Bold" titleId="toolbar-bold-icon" />
            </ToolbarButton>
            <ToolbarButton type="mark" format="italic">
              <FormatItalicIcon title="Italic" titleId="toolbar-italic-icon" />
            </ToolbarButton>
            <ToolbarButton type="mark" format="underline">
              <FormatUnderlinedIcon title="Underline" titleId="toolbar-underlined-icon" />
            </ToolbarButton>
            <ToolbarButton type="link" format="link">
              <FormatLinkIcon title="Hyperlink" titleId="toolbar-link-icon" />
            </ToolbarButton>
            <ToolbarButton type="block" format="heading-two">
              <FormatTitleIcon title="Apply heading" titleId="toolbar-title-icon" />
            </ToolbarButton>
            <ToolbarButton type="block" format="block-quote">
              <FormatQuoteIcon title="Block quote" titleId="toolbar-quote-icon" />
            </ToolbarButton>
            <ToolbarButton type="block" format="numbered-list">
              <FormatListNumberedIcon title="Numbered list" titleId="toolbar-list-numbered-icon" />
            </ToolbarButton>
            <ToolbarButton type="block" format="bulleted-list">
              <FormatListBulletedIcon title="Bulleted list" titleId="toolbar-list-bulleted-icon" />
            </ToolbarButton>
          </Toolbar>

          <Editable
            renderElement={renderElement}
            renderLeaf={renderLeaf}
            placeholder={t('editor.placeholderPrompt')}
            spellCheck
            onKeyDown={(event: React.KeyboardEvent) => {
              Object.entries(HOTKEYS).forEach(([hotkey, mark]) => {
                // Convert React keyboard event to native keyboard event
                if (isHotkey(hotkey, (event as unknown) as KeyboardEvent)) {
                  event.preventDefault()
                  toggleMark({ editor, format: mark })
                }
              })
            }}
          />
        </Slate>
      </div>
      <PostBodyStyles parentClassName="editor-container" />
      <style jsx>{`
        .editor-container {
          padding: 0 25px 10px;
          border: 1px solid ${theme.colors.black};
          border-radius: 5px;
          min-height: 200px;
          background-color: ${theme.colors.white};
        }
      `}</style>
    </div>
  )
}

const Element: React.FC<RenderElementProps> = ({ attributes, children, element }) => {
  switch (element.type) {
    case 'block-quote':
      return <blockquote {...attributes}>{children}</blockquote>
    case 'bulleted-list':
      return <ul {...attributes}>{children}</ul>
    case 'heading-two':
      return <h2 {...attributes}>{children}</h2>
    case 'link':
      return (
        <a {...attributes} href={element.url}>
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

const Leaf = ({ attributes, children, leaf }: RenderLeafProps) => {
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

const ToolbarButton: React.FC<ButtonProps> = ({ type, format, children }) => {
  const { t } = useTranslation('post')
  const editor = useSlate()
  const active = isTypeActive({ type, format, editor })
  const buttonClasses = classNames('toolbar-button', { active })

  const handleMouseDown = (event: React.MouseEvent) => {
    event.preventDefault()
    toogleByType({ type, format, editor, t })
  }

  return (
    <div className={buttonClasses} onMouseDown={handleMouseDown}>
      {children}

      <style jsx>{`
        .toolbar-button {
          height: 100%;
          margin-right: 10px;
          border-radius: 5px;
          background-color: ${theme.colors.gray800};
          cursor: pointer;
        }

        .toolbar-button:last-child {
          margin-right: 0;
        }

        .toolbar-button:hover {
          box-shadow: 0px 8px 10px #00000029;
        }

        .toolbar-button :global(svg) {
          display: block;
        }

        .toolbar-button.active :global(svg) {
          fill: ${theme.colors.blueLight};
        }
      `}</style>
    </div>
  )
}

export default JournalyEditor
