import { Outlet } from "react-router-dom";
import { SearchModal } from "./components/SearchModal";
import SideBar from "./components/SideBar";

const Layout = () => {
  return (
    <div className="h-full flex">
      <SideBar onSearchButtonClicked={() => {}} />
      <main className="flex-1 h-full overflow-y-auto">
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
