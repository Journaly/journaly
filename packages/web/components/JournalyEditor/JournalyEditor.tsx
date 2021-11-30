import React, { useEffect, useMemo, useCallback, useRef, useState } from 'react'
import { createEditor, Editor, Descendant } from 'slate'
import { Slate, withReact } from 'slate-react'
import { withHistory } from 'slate-history'
import { pipe, TablePlugin, EditablePlugins } from '@udecode/slate-plugins'
import isHotkey from 'is-hotkey'

import theme from '@/theme'
import PostBodyStyles from '@/components/PostBodyStyles'
import Toolbar from './Toolbar'
import RenderElement from './RenderElement'
import RenderLeaf from './RenderLeaf'
import { withLinks, withImages, toggleMark, options, MarkType } from './helpers'
import SwitchToggle from '../SwitchToggle'

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

type JournalyEditorProps = {
  value: Descendant[]
  setValue: (value: Descendant[]) => void
  slateRef: React.RefObject<Editor>
  allowInlineImages: boolean
  disabled?: boolean
  playTypewriterSounds?: boolean
}
const plugins = [TablePlugin(options)]

const JournalyEditor = ({
  value,
  setValue,
  slateRef,
  disabled,
  allowInlineImages,
}: JournalyEditorProps) => {
  const renderElement = useCallback((props) => <RenderElement {...props} />, [])
  const renderLeaf = useCallback((props) => <RenderLeaf {...props} />, [])
  const editor = useMemo(() => {
    const withPlugins: ((ed: Editor) => Editor)[] = [withHistory, withLinks]

    if (allowInlineImages) {
      withPlugins.push(withImages)
    }

    return pipe(withReact(createEditor()), ...withPlugins)
  }, [])

  const [playTypewriterSounds, setPlayTypewriterSounds] = useState(false)

  const typewriterSound = useRef<HTMLAudioElement | undefined>(
    typeof Audio !== 'undefined'
      ? new Audio('https://journaly-sound-effects.s3.us-east-2.amazonaws.com/typewriter-sound.wav')
      : undefined,
  )

  const handlePlayTypewriterSound = (
    sound: React.MutableRefObject<HTMLAudioElement | undefined>,
  ) => {
    // Always rewind audio to beginning before playing
    // This enables rapic replays even if the file was still playing
    console.log('play', playTypewriterSounds)
    if (sound.current && playTypewriterSounds) {
      console.log('TAP!')
      sound.current.currentTime = 0
      sound.current.play()
    }
    return
  }

  useEffect(() => {
    ;(slateRef as React.MutableRefObject<Editor>).current = editor
  }, [editor])

  return (
    <div className="editor-wrapper">
      <div className="editor-container">
        <Slate editor={editor} value={value} onChange={(value) => setValue(value)}>
          <Toolbar
            allowInlineImages={allowInlineImages}
            playTypewriterSounds={playTypewriterSounds}
            onTogglePlayTypewriterSounds={() => setPlayTypewriterSounds(!playTypewriterSounds)}
          />
          <EditablePlugins
            plugins={plugins}
            renderElement={[renderElement]}
            renderLeaf={[renderLeaf]}
            readOnly={disabled}
            spellCheck
            onKeyDown={[
              (event: React.KeyboardEvent) => {
                handlePlayTypewriterSound(typewriterSound)
                Object.entries(HOTKEYS).forEach(([hotkey, mark]) => {
                  // Convert React keyboard event to native keyboard event
                  if (isHotkey(hotkey, event as unknown as KeyboardEvent)) {
                    event.preventDefault()
                    toggleMark(editor, mark)
                  }
                })
              },
            ]}
            data-testid="post-body"
          />
        </Slate>
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
