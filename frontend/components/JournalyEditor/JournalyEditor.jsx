import React, { useEffect, useMemo, useState } from "react";
// The Slate editor factory.
import { createEditor } from "slate";
// Slate components and React plugin.
import { Slate, Editable, withReact } from "slate-react";

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
 */

const JournalyEditor = () => {
  const editor = useMemo(() => withReact(createEditor()), []);
  const [value, setValue] = useState([
    {
      type: "paragraph",
      children: [{ text: "It all started this morning..." }]
    }
  ]);

  return (
    <Slate editor={editor} value={value} onChange={value => setValue(value)}>
      <Editable />
    </Slate>
  );
};

export default JournalyEditor;
