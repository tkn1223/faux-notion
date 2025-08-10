import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { SearchModal } from "./components/SearchModal";
import SideBar from "./components/SideBar";
import { useCurrentUserStore } from "./modules/auth/current-user.state";
import { noteRepository } from "./modules/notes/note.repository";
import { useNoteStore } from "./modules/notes/note.state";

const Layout = () => {
  const { currentUser } = useCurrentUserStore();
  const noteStore = useNoteStore();
  const [isLoading, setIsLoading] = useState(false);

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

  if (currentUser == null) return <Navigate to="/signin" />;

  return (
    <div className="h-screen flex">
      {!isLoading && <SideBar onSearchButtonClicked={() => {}} />}
      <main className="flex-1 h-screen overflow-y-auto">
        <Outlet />
        <SearchModal
          isOpen={false}
          notes={[]}
          onItemSelect={() => {}}
          onKeywordChanged={() => {}}
          onClose={() => {}}
        />
      </main>
    </div>
  );
};

export default Layout;
