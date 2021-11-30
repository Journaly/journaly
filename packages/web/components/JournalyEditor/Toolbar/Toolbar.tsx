import React, { useState, useEffect, useRef } from 'react'
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
import { headerHeight } from '@/components/Dashboard/dashboardConstants'
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

type ToolbarProps = {
  allowInlineImages: boolean
  playTypewriterSounds: boolean
  onTogglePlayTypewriterSounds: () => void
}

const Toolbar = ({
  allowInlineImages,
  playTypewriterSounds,
  onTogglePlayTypewriterSounds,
}: ToolbarProps) => {
  const editor = useSlate()
  const isEditorFocused = useFocused()
  const toolbarRef = useRef<HTMLDivElement>(null)
  const [isFixed, setIsFixed] = useState(false)
  // Save the initial distance that the toolbar is from the top of the page
  const originalElementOffsetTop = toolbarRef?.current?.offsetTop as number
  // Save height of toolbar so that when it's fixed and removed from document flow,
  // the parent takes the same height and surrounding content won't collapse
  const fixedDistanceFromTop = 20
  const toolbarHeight = toolbarRef.current?.getBoundingClientRect().height || 56
  const toolbarClasses = classNames('editor-toolbar-container', { 'is-fixed': isFixed })
  const isTableActivated = isEditorFocused && isTableActive(editor)
  const tableIcon = (
    <ToolbarButton type="table" format="insert-table">
      <FormatTableIcon title="Insert table" titleId="toolbar-insert-table-icon" />
    </ToolbarButton>
  )
  const handleScroll = () => {
    if (toolbarRef.current) {
      if (!isFixed && window.pageYOffset >= toolbarRef.current.offsetTop - fixedDistanceFromTop) {
        setIsFixed(true)
        return
      }

      if (isFixed && window.pageYOffset + fixedDistanceFromTop < originalElementOffsetTop) {
        setIsFixed(false)
        return
      }
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [isFixed, originalElementOffsetTop])

  return (
    <div className={toolbarClasses} ref={toolbarRef}>
      <div className="editor-toolbar">
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

        <div className="typewriter-sounds-switch-container">
          <span>Typewriter Sounds</span>
          <SwitchToggle isToggled={playTypewriterSounds} onToggle={onTogglePlayTypewriterSounds} />
        </div>
      </div>
      <style jsx>{`
        .editor-toolbar-container {
          height: ${toolbarHeight}px;
        }

        .editor-toolbar {
          display: flex;
          justify-content: center;
          padding: 15px 0;
          border-bottom: 2px solid #eee;
          z-index: 1;
        }

        .is-fixed .editor-toolbar {
          position: fixed;
          top: calc(${headerHeight} + ${fixedDistanceFromTop}px);
          left: 50%;
          transform: translateX(-50%);
          padding: 15px;
          background: ${theme.colors.white};
          border-radius: 5px;
          box-shadow: 0px 8px 10px #00000029;
          border: 1px solid #eee;
        }

        .typewriter-sounds-switch-container {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 10px;
        }

        @media (${navConstants.skinnyNavToDesktop}) {
          .is-fixed .editor-toolbar {
            top: ${fixedDistanceFromTop}px;
            left: calc(50% + ${navConstants.skinnyNavWidth / 2}px);
          }
        }

        @media (${navConstants.aboveDesktopNav}) {
          .is-fixed .editor-toolbar {
            top: ${fixedDistanceFromTop}px;
            left: calc(50% + ${navConstants.navWidth / 2}px);
          }
        }
      `}</style>
      <style>{`
        .editor-toolbar-popover-item {
          width: 100%;
          justify-content: left;
          padding-left: 7px;
        }

        .editor-toolbar-popover-item:hover {
          font-weight: 600;
        }
      `}</style>
    </div>
  )
}

export default Toolbar
