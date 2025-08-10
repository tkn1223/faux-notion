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
    return {
        getAll: () => notes,
        set,
    };
};