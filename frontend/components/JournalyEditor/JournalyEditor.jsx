import React, { useEffect, useMemo, useState, useCallback } from "react";
// The Slate editor factory.
import { createEditor, Editor, Transforms, Text } from "slate";
// Slate components and React plugin.
import { Slate, Editable, withReact } from "slate-react";
import { withHistory } from "slate-history";
import isHotkey from "is-hotkey";

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

// Custom set of helpers
const helpers = {
  isBoldMarkActive(editor) {
    const [match] = Editor.nodes(editor, {
      match: n => n.bold === true,
      universal: true
    });

    return !!match;
  },

  isCodeBlockActive(editor) {
    const [match] = Editor.nodes(editor, {
      match: n => n.type === "code"
    });

    return !!match;
  },

  toggleBoldMark(editor) {
    const isActive = helpers.isBoldMarkActive(editor);
    Transforms.setNodes(
      editor,
      { bold: isActive ? null : true },
      { match: n => Text.isText(n), split: true }
    );
  },

  toggleCodeBlock(editor) {
    const isActive = helpers.isCodeBlockActive(editor);
    Transforms.setNodes(
      editor,
      { type: isActive ? null : "code" },
      { match: n => Editor.isBlock(editor, n) }
    );
  }
};

// A React component renderer for our code blocks
const CodeElement = props => {
  return (
    <pre {...props.attributes}>
      <code>{props.children}</code>
    </pre>
  );
};

const DefaultElement = props => {
  return <p {...props.attributes}>{props.children}</p>;
};

// React component to render leaves with bold text.
const Leaf = props => {
  return (
    <span
      {...props.attributes}
      style={{ fontWeight: props.leaf.bold ? "bold" : "normal" }}
    >
      {props.children}
    </span>
  );
};

const JournalyEditor = () => {
  const editor = useMemo(() => withReact(createEditor()), []);
  const [value, setValue] = useState([
    {
      type: "paragraph",
      children: [{ text: "It all started this morning..." }]
    }
  ]);

  // Rendering function based on the element passed to `props`.
  // Uses `useCallback` here to memoize the function for subsequent renders.
  const renderElement = useCallback(props => {
    switch (props.element.type) {
      case "code":
        return <CodeElement {...props} />;
      default:
        return <DefaultElement {...props} />;
    }
  }, []);

  // Define a leaf rendering function that is memoized with `useCallback`.
  const renderLeaf = useCallback(props => {
    return <Leaf {...props} />;
  }, []);

  return (
    <div className="editor-wrapper">
      <div className="editor-container">
        <Slate
          editor={editor}
          value={value}
          onChange={value => setValue(value)}
        >
          <div>
            <button
              onMouseDown={event => {
                event.preventDefault();
                helpers.toggleBoldMark(editor);
              }}
            >
              Bold
            </button>
            <button
              onMouseDown={event => {
                event.preventDefault();
                helpers.toggleCodeBlock(editor);
              }}
            >
              Code Block
            </button>
          </div>
          <Editable
            renderElement={renderElement}
            renderLeaf={renderLeaf}
            onKeyDown={event => {
              if (!event.ctrlKey) {
                return;
              }

              switch (event.key) {
                case "`": {
                  event.preventDefault();
                  helpers.toggleCodeBlock(editor);
                  break;
                }

                // When "B" is pressed, bold the text in the selection.
                case "b": {
                  event.preventDefault();
                  helpers.toggleBoldMark(editor);
                  break;
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

export default JournalyEditor;
