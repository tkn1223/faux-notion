import { cn } from "@/lib/utils";
import { useCurrentUserStore } from "@/modules/auth/current-user.state";
import type { Note } from "@/modules/notes/note.entity";
import { noteRepository } from "@/modules/notes/note.repository";
import { useNoteStore } from "@/modules/notes/note.state";
import type React from "react";
import { NoteItem } from "./NoteItem";

interface NoteListProps {
  layer?: number;
  parentId?: number;
}

export function NoteList({ layer = 0, parentId }: NoteListProps) {
  const noteStore = useNoteStore();
  const notes = noteStore.getAll();
  const { currentUser } = useCurrentUserStore();

  // noteが存在するかを確認
  const filterNotes = notes.length > 0;

  const createChild = async (e: React.MouseEvent, parentId: number) => {
    e.stopPropagation();
    const newNote = await noteRepository.create(currentUser!.id, { parentId });
    noteStore.set([newNote]);
  };

  const fetchChildren = async (e: React.MouseEvent, note: Note) => {
    e.stopPropagation();
    const children = await noteRepository.find(currentUser!.id, note.id);
    if (children == null) return;
    noteStore.set(children);
  };

  return (
    <>
      {!filterNotes && (
        <p
          className={cn(
            `text-sm font-medium text-gray-500`,
            layer === 0 && "hidden"
          )}
          style={{ paddingLeft: layer ? `${layer * 12 + 25}px` : undefined }}
        >
          ページがありません
        </p>
      )}
      {filterNotes &&
        notes
          .filter((note) => note.parent_document == parentId)
          .map((note) => {
            return (
              <div key={note.id}>
                <NoteItem
                  note={note}
                  layer={layer}
                  onExpand={(e: React.MouseEvent) => fetchChildren(e, note)}
                  onCreate={(e: React.MouseEvent) => createChild(e, note.id)}
                />
                <NoteList layer={layer + 1} parentId={note.id} />
              </div>
            );
          })}
    </>
  );
}
