import { ja } from "@blocknote/core/locales";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";
import { useCreateBlockNote } from "@blocknote/react";

interface EditorProps {
  onChange: (value: string) => void;
  initialContent?: string | null;
}

function Editor({ onChange, initialContent }: EditorProps) {
  const editor = useCreateBlockNote({
    dictionary: ja,
    initialContent:
      initialContent != null ? JSON.parse(initialContent) : undefined,
  });

  return (
    <div>
      <BlockNoteView
        editor={editor}
        onChange={() => onChange(JSON.stringify(editor.document))}
        theme="light"
      />
    </div>
  );
}

export default Editor;
