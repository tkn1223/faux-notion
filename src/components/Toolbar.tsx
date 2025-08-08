import { type Note } from "@/modules/notes/note.entity.ts";
import TextareaAutosize from "react-textarea-autosize";

interface TitleInputProps {
  initialData: Note;
  onTitleChange: (val: string) => void;
}

export function TitleInput({ initialData, onTitleChange }: TitleInputProps) {
  return (
    <div className="pl-[54px] group relative">
      <TextareaAutosize
        className="text-5xl bg-transparent font-bold break-words outline-none text-[#3F3F3F]
        resize-none"
      />
    </div>
  );
}
