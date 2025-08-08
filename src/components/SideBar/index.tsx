import { Plus, Search } from "lucide-react";
import { type FC } from "react";
import { NoteList } from "../NoteList";
import { Item } from "./Item";
import UserItem from "./UserItem";

type Props = {
  onSearchButtonClicked: () => void;
};

const SideBar: FC<Props> = ({ onSearchButtonClicked }) => {
  return (
    <>
      <aside className="group/sidebar h-full bg-neutral-100 overflow-y-auto relative flex flex-col w-60">
        <div>
          <div>
            <UserItem
              user={{
                id: "test",
                aud: "test",
                email: "test@gmail.com",
                user_metadata: { name: "testさん" },
                app_metadata: {},
                created_at: "test",
              }}
              signout={() => {}}
            />
            <Item label="検索" icon={Search} onClick={onSearchButtonClicked} />
          </div>
          <div className="mt-4">
            <NoteList />
            <Item label="ノートを作成" icon={Plus} />
          </div>
        </div>
      </aside>
      <div className="absolute top-0 z-[99999] left-60 w-[calc(100%-240px)]"></div>
    </>
  );
};

export default SideBar;
