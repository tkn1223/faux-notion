import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import type { Note } from "@/modules/notes/note.entity";
import { FileIcon, MoreHorizontal, Plus, Trash } from "lucide-react";
import { Item } from "../SideBar/Item";

interface Props {
  note: Note;
  expanded?: boolean;
  layer?: number;
  isSelected?: boolean;
  onExpand?: (event: React.MouseEvent) => void;
  onCreate?: (event: React.MouseEvent) => void;
  onDelete?: (event: React.MouseEvent) => void;
  onClick?: () => void;
}

export function NoteItem({
  note,
  onClick,
  layer = 0,
  expanded = false,
  isSelected = false,
  onCreate,
  onDelete,
  onExpand,
}: Props) {
  const menu = (
    <div className={cn("ml-auto flex items-center gap-x-2")}>
      <DropdownMenu>
        <DropdownMenuTrigger onClick={(e) => e.stopPropagation()}>
          <div
            className="h-full ml-auto rounded-sm hover:bg-neutral-300 cursor-pointer p-1 transition-colors"
            role="button"
          >
            <MoreHorizontal className="w-4 h-4 text-gray-600" />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="w-60"
          align="start"
          side="right"
          forceMount
        >
          <DropdownMenuItem onClick={onDelete}>
            <Trash className="w-4 h-4 mr-2" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <div
        className="h-full ml-auto rounded-sm hover:bg-neutral-300 cursor-pointer p-1 transition-colors"
        role="button"
        onClick={onCreate}
      >
        <Plus className="w-4 h-4 text-gray-600" />
      </div>
    </div>
  );

  return (
    <div
      onClick={onClick}
      role="button"
      className="cursor-pointer"
      style={{ paddingLeft: layer != null ? `${layer * 12 + 12}px` : "12px" }}
    >
      <Item
        label={note.title ?? "無題"}
        icon={FileIcon}
        onIconClick={onExpand}
        trailingItem={menu}
      />
    </div>
  );
}
