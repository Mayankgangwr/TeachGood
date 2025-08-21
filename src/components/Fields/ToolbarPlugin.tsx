import React from "react";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { FORMAT_TEXT_COMMAND } from "lexical";

export const ToolbarPlugin: React.FC = () => {
  const [editor] = useLexicalComposerContext();

  return (
    <div className="mb-2 flex gap-2">
      <button
        type="button"
        className="px-2 py-1 border rounded"
        onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, "bold")}
      >
        B
      </button>
      <button
        type="button"
        className="px-2 py-1 border rounded italic"
        onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, "italic")}
      >
        I
      </button>
      <button
        type="button"
        className="px-2 py-1 border rounded underline"
        onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, "underline")}
      >
        U
      </button>
    </div>
  );
};
