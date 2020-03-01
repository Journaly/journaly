import React, { useEffect, useMemo, useState, useCallback } from "react";
import { createEditor, Editor, Transforms } from "slate";
import { Slate, Editable, withReact } from "slate-react";

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

// Define a React component to render leaves with bold text.
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
    <div className="journaly-editor-wrapper">
      <div className="journaly-editor-container">
        <Slate
          editor={editor}
          value={value}
          onChange={value => setValue(value)}
        >
          <Editable
            renderElement={renderElement}
            // Pass in the `renderLeaf` function.
            renderLeaf={renderLeaf}
            onKeyDown={event => {
              if (!event.ctrlKey) {
                return;
              }

              switch (event.key) {
                case "`": {
                  event.preventDefault();
                  const [match] = Editor.nodes(editor, {
                    match: n => n.type === "code"
                  });
                  Transforms.setNodes(
                    editor,
                    { type: match ? null : "code" },
                    { match: n => Editor.isBlock(editor, n) }
                  );
                  break;
                }

                case "b": {
                  event.preventDefault();
                  Transforms.setNodes(
                    editor,
                    { bold: true },
                    { match: n => Text.isText(n), split: true }
                  );
                  break;
                }
              }
            }}
          />
        </Slate>
      </div>
      <style jsx>{`
        .journaly-editor-wrapper {
          padding: 50px;
        }
        .journaly-editor-container {
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
