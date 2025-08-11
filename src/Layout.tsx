import { useEffect, useState } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { SearchModal } from "./components/SearchModal";
import SideBar from "./components/SideBar";
import { useCurrentUserStore } from "./modules/auth/current-user.state";
import type { Note } from "./modules/notes/note.entity";
import { noteRepository } from "./modules/notes/note.repository";
import { useNoteStore } from "./modules/notes/note.state";

const Layout = () => {
  const navigate = useNavigate();
  const { currentUser } = useCurrentUserStore();
  const noteStore = useNoteStore();
  const [isLoading, setIsLoading] = useState(false);
  const [isShowModal, setIsShowModal] = useState(false);
  const [searchResult, setSearchResult] = useState<Note[]>([]);

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    setIsLoading(true);
    const notes = await noteRepository.find(currentUser!.id);
    if (notes == null) return;
    noteStore.set(notes);
    setIsLoading(false);
  };

  const searchNotes = async (keyword: string) => {
    const notes = await noteRepository.findByKeyword(currentUser!.id, keyword);
    if (notes == null) return;
    noteStore.set(notes);
    setSearchResult(notes);
  };

  const moveToDetail = (noteId: number) => {
    navigate(`/note/${noteId}`);
    setIsShowModal(false);
  };

  if (currentUser == null) return <Navigate to="/signin" />;

  return (
    <div className="h-screen flex">
      {!isLoading && (
        <SideBar onSearchButtonClicked={() => setIsShowModal(true)} />
      )}
      <main className="flex-1 h-screen overflow-y-auto">
        <Outlet />
        <SearchModal
          isOpen={isShowModal}
          notes={searchResult}
          onItemSelect={moveToDetail}
          onKeywordChanged={searchNotes}
          onClose={() => setIsShowModal(false)}
        />
      </main>
    </div>
  );
};

export default Layout;
