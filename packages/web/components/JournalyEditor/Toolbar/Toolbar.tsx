import React, { useEffect, useState } from 'react'
import classNames from 'classnames'
import { Popup } from 'reactjs-popup'
import {
  TableToolbarButton,
  deleteTable,
  deleteColumn,
  insertTableColumn,
  deleteRow,
  insertTableRow,
} from '@udecode/plate'
import { useSlate } from 'slate-react'

import theme from '@/theme'

import SkipLink, { SkipLinkTarget } from '@/components/SkipLink'
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
import { isTableActive } from '../helpers'
import SwitchToggle from '@/components/SwitchToggle'
import { useTranslation } from '@/config/i18n'
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
  // The diff between viewport & visualViewport sizes
  const [viewportsDiff, setViewportsDiff] = useState(0)

  const editor = useSlate()
  const isTableActivated = isTableActive(editor)
  const tableIcon = (
    <div>
      <ToolbarButton type="table" format="insert-table">
        <FormatTableIcon title="Insert table" titleId="toolbar-insert-table-icon" />
      </ToolbarButton>
    </div>
  )

  const [toolbarObserverRef, toolbarShouldFloat] = useIntersectionObserver({
    rootMargin: '-20px 0px 0px 0px',
  })

  useEffect(() => {
    const vvp = visualViewport
    if (!vvp) return

    const onVisualViewportChange = () => {
      setViewportsDiff(vvp.offsetTop)
    }

    onVisualViewportChange()

    vvp.addEventListener('resize', onVisualViewportChange)
    vvp.addEventListener('scroll', onVisualViewportChange)

    return () => {
      vvp.removeEventListener('resize', onVisualViewportChange)
      vvp.removeEventListener('scroll', onVisualViewportChange)
    }
  }, [])

  const toolbarClasses = classNames('editor-toolbar-container', { 'is-fixed': !toolbarShouldFloat })

  return (
    <>
      <div ref={toolbarObserverRef} />
      <div className={toolbarClasses}>
        <div className="editor-toolbar">
          <SkipLink target="end-editing-controls">Skip formatting controls</SkipLink>
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
                trigger={tableIcon}
                position="bottom center"
                on={['hover', 'focus', 'click']}
                closeOnDocumentClick
                className="editor-toolbar-popover"
              >
                <TableToolbarButton
                  className="editor-toolbar-popover-item"
                  transform={insertTableRow}
                  icon="Add row"
                />
                <TableToolbarButton
                  className="editor-toolbar-popover-item"
                  transform={deleteRow}
                  icon="Delete row"
                />
                <TableToolbarButton
                  className="editor-toolbar-popover-item"
                  transform={insertTableColumn}
                  icon="Add column"
                />
                <TableToolbarButton
                  className="editor-toolbar-popover-item"
                  transform={deleteColumn}
                  icon="Delete column"
                />
                <TableToolbarButton
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
          <SkipLinkTarget id="end-editing-controls" />
        </div>
        <style jsx>{`
          .editor-toolbar-container {
            position: sticky;
            // Push toolbar down from the top of the logical viewport to the degree that the logical viewport is outside the visual viewport
            top: ${viewportsDiff + 20}px;
            z-index: 1;
            background-color: ${theme.colors.white};
            transition: top 0.35s ease-in-out;
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
