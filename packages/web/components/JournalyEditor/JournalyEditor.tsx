import React, { useEffect, useMemo, useCallback } from 'react'
import { Editor } from 'slate'
import {
  createPlateEditor,
  Plate,
  PlateProvider,
  PlateEditor,
  TElement,
  createPlugins,
  createTablePlugin,
  createPlateUI,
} from '@udecode/plate'
import isHotkey from 'is-hotkey'

import theme from '@/theme'
import PostBodyStyles from '@/components/PostBodyStyles'
import Toolbar from './Toolbar'
import RenderElement from './RenderElement'
import RenderLeaf from './RenderLeaf'
import { withLinks, withImages, toggleMark, MarkType } from './helpers'
import usePlayPolyphonicSound from '@/hooks/usePlayPolyphonicSound'
import useAutosavedState from '@/hooks/useAutosavedState'

/**
 * The Journaly Rich Text Editor
 *   Uses the Slate library to build a delightful
 *   rich text editing experience that allows users
 *   to craft & format beautiful posts themselves.
 */

type HotKey = 'mod+b' | 'mod+i' | 'mod+u'

const HOTKEYS: { [key in HotKey]: MarkType } = {
  'mod+b': 'bold',
  'mod+i': 'italic',
  'mod+u': 'underline',
}

const KEY_BLACK_LIST = new Set([
  'Shift',
  'Tab',
  'Meta',
  'Control',
  'Alt',
  'ArrowUp',
  'ArrowLeft',
  'ArrowDown',
  'ArrowRight',
  'PageUp',
  'PageDown',
  'Home',
  'End',
])

type JournalyEditorProps = {
  value: TElement[]
  setValue: (value: TElement[]) => void
  slateRef: React.RefObject<Editor>
  allowInlineImages: boolean
  disabled?: boolean
}
const JournalyEditor = ({
  value,
  setValue,
  slateRef,
  disabled,
  allowInlineImages,
}: JournalyEditorProps) => {
  const renderElement = useCallback((props) => <RenderElement {...props} />, [])
  const renderLeaf = useCallback((props) => <RenderLeaf {...props} />, [])

  const plugins = useMemo(() => {
    return createPlugins(
      [ createTablePlugin({}) ],
      {
        components: createPlateUI()
      }
    )
  }, [])

  const editor = useMemo(() => {
    const editor = withLinks(createPlateEditor({
      plugins: plugins as any
    }) as Editor)

    return allowInlineImages ? withImages(editor) : editor
  }, [])


  const [shouldPlayTypewriterSounds, setShouldPlayTypewriterSounds] = useAutosavedState(false, {
    key: 'shouldPlayTypewriterSounds',
  })

  const playTypewriterSound = usePlayPolyphonicSound('/static/sounds/typewriter-key-sound.wav', 3)
  const playTypewriterReturnSound = usePlayPolyphonicSound(
    '/static/sounds/typewriter-return-sound.wav',
    1,
  )

  const onKeyDown = useCallback((event: React.KeyboardEvent) => {
    if (shouldPlayTypewriterSounds) {
      if (KEY_BLACK_LIST.has(event.key)) return
      else if (event.key === 'Enter') {
        playTypewriterReturnSound()
      } else {
        playTypewriterSound()
      }
    }

    Object.entries(HOTKEYS).forEach(([hotkey, mark]) => {
      // Convert React keyboard event to native keyboard event
      if (isHotkey(hotkey, event as unknown as KeyboardEvent)) {
        event.preventDefault()
        toggleMark(editor, mark)
      }
    })
  }, [editor, shouldPlayTypewriterSounds, playTypewriterSound, playTypewriterReturnSound])

  useEffect(() => {
    ;(slateRef as React.MutableRefObject<Editor>).current = editor
  }, [editor])

  if (typeof window === 'undefined') {
    return null
  }

  return (
    <div className="editor-wrapper">
      <div className="editor-container">
        <PlateProvider editor={editor as PlateEditor}>
          <Plate
            value={value}
            onChange={(v) => setValue(v)}
            editableProps={{
              spellCheck: true,
              readOnly: disabled,
              onKeyDown: onKeyDown,
              renderElement,
              renderLeaf,
            }}
            firstChildren={(
              <Toolbar
                allowInlineImages={allowInlineImages}
                shouldPlayTypewriterSounds={shouldPlayTypewriterSounds}
                onToggleShouldPlayTypewriterSounds={() =>
                  setShouldPlayTypewriterSounds(!shouldPlayTypewriterSounds)
                }
              />
            )}
          />
        </PlateProvider>
      </div>
      <PostBodyStyles parentClassName="editor-container" />
      <style jsx>{`
        .editor-container {
          display: flex;
          flex-direction: column;

          padding: 0 25px 10px;
          border: 1px solid ${theme.colors.black};
          border-radius: 5px;
          background-color: ${theme.colors.white};
          opacity: ${disabled ? 0.6 : 'auto'};
          min-height: 200px;
        }

        .editor-container > :global([contenteditable='true']) {
          flex: 1;
          padding-top: 15px;
        }
      `}</style>
    </div>
  )
}

export default JournalyEditor


/*
        <Slate editor={editor} value={value} onChange={(value) => setValue(value)}>
          <Toolbar
            allowInlineImages={allowInlineImages}
            shouldPlayTypewriterSounds={shouldPlayTypewriterSounds}
            onToggleShouldPlayTypewriterSounds={() =>
              setShouldPlayTypewriterSounds(!shouldPlayTypewriterSounds)
            }
          />
          <EditablePlugins
            plugins={plugins}
            renderElement={[renderElement]}
            renderLeaf={[renderLeaf]}
            readOnly={disabled}
            spellCheck
            onKeyDown={[
              (event: React.KeyboardEvent) => {
                handlePlayTypewriterSound(event)
                Object.entries(HOTKEYS).forEach(([hotkey, mark]) => {
                  // Convert React keyboard event to native keyboard event
                  if (isHotkey(hotkey, event as unknown as KeyboardEvent)) {
                    event.preventDefault()
                    toggleMark(editor, mark)
                  }
                })
              },
            ]}
            onKeyDownDeps={[shouldPlayTypewriterSounds]}
            data-testid="post-body"
          />
        </Slate>

*/
