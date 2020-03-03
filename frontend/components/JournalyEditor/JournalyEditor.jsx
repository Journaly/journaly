import React, { useMemo, useState, useCallback } from "react";
import { createEditor, Editor, Transforms } from "slate";
// Slate components and React plugin.
import { Slate, Editable, withReact, useSlate } from "slate-react";
import { withHistory } from "slate-history";
import isHotkey from "is-hotkey";

import Toolbar from "./Toolbar";
import Button from "./Button";

/**
 * The Journaly Rich Text Editor
 *   Uses the Slate library to build a delightgul
 *   rich text editing experience that allows users
 *   to craft & format beautiful posts themselves.
 *
 * 1. `editor` @object
 * 2. State for the editor
 * 3. <Slate> context provider.
 *    - This keeps track of the editor, its plugins,
 *      value, selection, and any changes that occur.
 *    - It MUST be rendered above any <Editable> components.
 *    - It can provide the editor state to other components
 *      using the `useSlate` hook.
 * 4. Leaf
 *    - For every format you add (bold, italic, ...)
 *      we need to define a <Leaf> component to tell Slate
 *      how to properly break up and render it.
 */

const HOTKEYS = {
  "mod+b": "bold",
  "mod+i": "italic",
  "mod+u": "underline",
  "mod+`": "code"
};

const LIST_TYPES = ["numbered-list", "bulleted-list"];

const JournalyEditor = () => {
  const [value, setValue] = useState(initialValue);
  const renderElement = useCallback(props => <Element {...props} />, []);
  const renderLeaf = useCallback(props => <Leaf {...props} />, []);
  const editor = useMemo(() => withHistory(withReact(createEditor())), []);

  return (
    <div className="editor-wrapper">
      <div className="editor-container">
        <Slate
          editor={editor}
          value={value}
          onChange={value => setValue(value)}
        >
          <Toolbar>
            <MarkButton format="bold" icon="B" />
            <MarkButton format="italic" icon="I" />
            <MarkButton format="underline" icon="U" />
            <MarkButton format="code" icon="<>" />
            <BlockButton format="heading-one" icon="H1" />
            <BlockButton format="heading-two" icon="H2" />
            <BlockButton format="block-quote" icon="Quote" />
            <BlockButton format="numbered-list" icon="OL" />
            <BlockButton format="bulleted-list" icon="UL" />
          </Toolbar>
          <Editable
            renderElement={renderElement}
            renderLeaf={renderLeaf}
            placeholder="It all started this morning when..."
            spellCheck
            autoFocus
            onKeyDown={event => {
              for (const hotkey in HOTKEYS) {
                if (isHotkey(hotkey, event)) {
                  event.preventDefault();
                  const mark = HOTKEYS[hotkey];
                  toggleMark(editor, mark);
                }
              }
            }}
          />
        </Slate>
      </div>
      <style jsx>{`
        .editor-wrapper {
          padding: 50px;
        }
        .editor-container {
          padding: 0 25px;
          border: 1px solid black;
          border-radius: 5px;
          min-height: 200px;
        }
      `}</style>
    </div>
  );
};

const toggleBlock = (editor, format) => {
  const isActive = isBlockActive(editor, format);
  const isList = LIST_TYPES.includes(format);

  Transforms.unwrapNodes(editor, {
    match: n => LIST_TYPES.includes(n.type),
    split: true
  });

  Transforms.setNodes(editor, {
    type: isActive ? "paragraph" : isList ? "list-item" : format
  });

  if (!isActive && isList) {
    const block = { type: format, children: [] };
    Transforms.wrapNodes(editor, block);
  }
};

const toggleMark = (editor, format) => {
  const isActive = isMarkActive(editor, format);

  if (isActive) {
    Editor.removeMark(editor, format);
  } else {
    Editor.addMark(editor, format, true);
  }
};

const isBlockActive = (editor, format) => {
  const [match] = Editor.nodes(editor, {
    match: n => n.type === format
  });

  return !!match;
};

const isMarkActive = (editor, format) => {
  const marks = Editor.marks(editor);
  return marks ? marks[format] === true : false;
};

const Element = ({ attributes, children, element }) => {
  switch (element.type) {
    case "block-quote":
      return <blockquote {...attributes}>{children}</blockquote>;
    case "bulleted-list":
      return <ul {...attributes}>{children}</ul>;
    case "heading-one":
      return <h1 {...attributes}>{children}</h1>;
    case "heading-two":
      return <h2 {...attributes}>{children}</h2>;
    case "list-item":
      return <li {...attributes}>{children}</li>;
    case "numbered-list":
      return <ol {...attributes}>{children}</ol>;
    default:
      return <p {...attributes}>{children}</p>;
  }
};

const Leaf = ({ attributes, children, leaf }) => {
  if (leaf.bold) {
    children = <strong>{children}</strong>;
  }

  if (leaf.code) {
    children = <code>{children}</code>;
  }

  if (leaf.italic) {
    children = <em>{children}</em>;
  }

  if (leaf.underline) {
    children = <u>{children}</u>;
  }

  return <span {...attributes}>{children}</span>;
};

const MarkButton = ({ format, icon }) => {
  const editor = useSlate();
  return (
    <Button
      active={isMarkActive(editor, format)}
      onMouseDown={event => {
        event.preventDefault();
        toggleMark(editor, format);
      }}
    >
      <p>{icon}</p>
    </Button>
  );
};

const BlockButton = ({ format, icon }) => {
  const editor = useSlate();
  return (
    <Button
      active={isBlockActive(editor, format)}
      onMouseDown={event => {
        event.preventDefault();
        toggleBlock(editor, format);
      }}
    >
      <p>{icon}</p>
    </Button>
  );
};

const initialValue = [
  {
    type: "paragraph",
    children: [{ text: "" }]
  }
];

export default JournalyEditor;
