import React from 'react'
import classNames from 'classnames'
import { Popup } from 'reactjs-popup'
import {
  ToolbarTable,
  deleteTable,
  deleteColumn,
  addColumn,
  deleteRow,
  addRow,
} from '@udecode/slate-plugins'
import { useSlate, useFocused } from 'slate-react'

import theme from '@/theme'

import { navConstants } from '@/components/Dashboard/Nav'
import FormatBoldIcon from '@/components/Icons/FormatBoldIcon'
import FormatItalicIcon from '@/components/Icons/FormatItalicIcon'
import FormatUnderlinedIcon from '@/components/Icons/FormatUnderlinedIcon'
import ImageIcon from '@/components/Icons/ImageIcon'
import FormatTitleIcon from '@/components/Icons/FormatTitleIcon'
import FormatLinkIcon from '@/components/Icons/FormatLinkIcon'
import FormatTableIcon from '@/components/Icons/FormatTableIcon'
import FormatQuoteIcon from '@/components/Icons/FormatQuoteIcon'
import FormatListNumberedIcon from '@/components/Icons/FormatListNumberedIcon'
import FormatListBulletedIcon from '@/components/Icons/FormatListBulletedIcon'

import ToggleMarkButton from './ToggleMarkButton'
import ToolbarButton from './ToolbarButton'
import InsertImageButton from './InsertImageButton'
import { options, isTableActive } from '../helpers'
import SwitchToggle from '@/components/SwitchToggle'
import { useTranslation } from '@/config/i18n'
import useGetWindowSize from '@/hooks/useGetWindowSize'
import useIntersectionObserver from '@/hooks/userIntersectionObserver'

type ToolbarProps = {
  allowInlineImages: boolean
  shouldPlayTypewriterSounds: boolean
  onToggleShouldPlayTypewriterSounds: () => void
}

const Toolbar = ({
  allowInlineImages,
  shouldPlayTypewriterSounds,
  onToggleShouldPlayTypewriterSounds,
}: ToolbarProps) => {
  const { t } = useTranslation('j-editor')

  const editor = useSlate()
  const isEditorFocused = useFocused()
  const isTableActivated = isEditorFocused && isTableActive(editor)
  const tableIcon = (
    <ToolbarButton type="table" format="insert-table">
      <FormatTableIcon title="Insert table" titleId="toolbar-insert-table-icon" />
    </ToolbarButton>
  )

  const windowSize = useGetWindowSize()

  // This is to accounnt for the nav which appears at the top on mobile and has a height of 72px
  const toolbarStickyOffset =
    windowSize.width && windowSize.width < navConstants.mobileBreakpoint ? -92 : -20

  const [toolbarObserverRef, toolbarShouldFloat] = useIntersectionObserver({
    rootMargin: `${toolbarStickyOffset}px 0px 0px 0px`,
  })

  const toolbarClasses = classNames('editor-toolbar-container', { 'is-fixed': !toolbarShouldFloat })

  return (
    <>
      <div ref={toolbarObserverRef} />
      <div className={toolbarClasses}>
        <div className="editor-toolbar">
          <div className="toolbar-row">
            <ToggleMarkButton type="bold">
              <FormatBoldIcon title="Bold" titleId="toolbar-bold-icon" />
            </ToggleMarkButton>
            <ToggleMarkButton type="italic">
              <FormatItalicIcon title="Italic" titleId="toolbar-italic-icon" />
            </ToggleMarkButton>
            <ToggleMarkButton type="underline">
              <FormatUnderlinedIcon title="Underline" titleId="toolbar-underlined-icon" />
            </ToggleMarkButton>
            <InsertImageButton allowInlineImages={allowInlineImages}>
              <ImageIcon title="Insert image" />
            </InsertImageButton>
            <ToolbarButton type="link" format="link">
              <FormatLinkIcon title="Hyperlink" titleId="toolbar-link-icon" />
            </ToolbarButton>
          </div>
          <div className="toolbar-row">
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

            {isTableActivated ? (
              <Popup
                trigger={<span>{tableIcon}</span>}
                position="bottom center"
                on={['hover', 'focus']}
                closeOnDocumentClick
                className="editor-toolbar-popover"
              >
                <ToolbarTable
                  {...options}
                  className="editor-toolbar-popover-item"
                  transform={addRow}
                  icon="Add row"
                />
                <ToolbarTable
                  {...options}
                  className="editor-toolbar-popover-item"
                  transform={deleteRow}
                  icon="Delete row"
                />
                <ToolbarTable
                  {...options}
                  className="editor-toolbar-popover-item"
                  transform={addColumn}
                  icon="Add column"
                />
                <ToolbarTable
                  {...options}
                  className="editor-toolbar-popover-item"
                  transform={deleteColumn}
                  icon="Delete column"
                />
                <ToolbarTable
                  {...options}
                  className="editor-toolbar-popover-item"
                  transform={deleteTable}
                  icon="Delete table"
                />
              </Popup>
            ) : (
              tableIcon
            )}
          </div>
          <div className="typewriter-sounds toolbar-row">
            <div className="typewriter-sounds-switch-container">
              <span>{t('typewriterSounds')}</span>
              <SwitchToggle
                isToggled={shouldPlayTypewriterSounds}
                onToggle={onToggleShouldPlayTypewriterSounds}
              />
            </div>
          </div>
        </div>
        <style jsx>{`
          .editor-toolbar-container {
            position: sticky;
            top: 20px;
            z-index: 1;
            background-color: ${theme.colors.white};
          }

          .editor-toolbar {
            display: flex;
            justify-content: center;
            flex-wrap: wrap;
            padding: 15px 0;
            border-bottom: 2px solid #eee;
            gap: 10px;
          }

          .editor-toolbar-container.is-fixed {
            border-radius: 5px;
            box-shadow: 0px 8px 10px #00000029;
            border: 1px solid #eee;
            background-color: ${theme.colors.white};
          }

          .typewriter-sounds-switch-container {
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 10px;
            height: 100%;
            margin-left: 10px;
          }

          /* Hide "Typewriter Sounds" when Toolbar is floating */
          .editor-toolbar-container.is-fixed .typewriter-sounds.toolbar-row {
            display: none;
          }

          @media (${navConstants.mobileNavOnly}) {
            .editor-toolbar-container {
              top: 80px;
            }
          }

          .editor-toolbar-popover-item {
            width: 100%;
            justify-content: left;
            padding-left: 7px;
          }

          .editor-toolbar-popover-item:hover {
            font-weight: 600;
          }

          .toolbar-row {
            display: flex;
            gap: 10px;
          }
        `}</style>
      </div>
    </>
  )
}

export default Toolbar
