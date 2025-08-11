import { atom, useAtom } from "jotai";
import type { Note } from "./note.entity";

const noteAtom = atom<Note[]>([]);

export const useNoteStore = () => {
  const [notes, setNotes] = useAtom(noteAtom);

  // setNotesを個別で作成する
  // 従来：重複するデータを重複したまま保存する
  // 新規：重複するデータを後からの情報で更新して保存する
  const set = (newNotes: Note[]) => {
    setNotes((oldNotes) => {
      const combineNotes = [...oldNotes, ...newNotes];

      const uniqueNotes: { [key: number]: Note } = {};
      for (const note of combineNotes) {
        uniqueNotes[note.id] = note;
      }
      return Object.values(uniqueNotes);
    });
  };

  // 子供のノートを再帰的に抽出する
  const deleteNote = (id: number) => {
    const findChildrenIds = (parentId: number): number[] => {
      const childrenIds = notes
        .filter((note) => note.parent_document === parentId)
        .map((child) => child.id);
      return childrenIds.concat(
        ...childrenIds.map((childId) => findChildrenIds(childId))
      );
    };
    const childrenIds = findChildrenIds(id);
    // 削除対象(idとchildrenIds)を削除する
    setNotes((oldNotes) =>
      oldNotes.filter((note) => ![...childrenIds, id].includes(note.id))
    );
  };

  const getOne = (id: number) => notes.find((note) => note.id === id);

  return {
    getAll: () => notes,
    getOne,
    set,
    delete: deleteNote,
  };
};
