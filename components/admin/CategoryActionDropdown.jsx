import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FiEdit } from "react-icons/fi";
import { FiTrash2 } from "react-icons/fi";
import Link from "next/link";
import DeleteCategoryModal from "./DeleteCategoryModal";
import { useState } from "react";
import EditCategoryModal from "./EditCategoryModal";
  
  const CategoryActionDropdown = ({ category, parentCategories, onEdit, onCategoryEdited, onDelete }) => {  

    const [modal, setModal] = useState(false);
    const [edit, setEdit] = useState(false);

    return (
      <DropdownMenu className="overflow-visible">
        {edit && <EditCategoryModal category={category} parentCategories={parentCategories} setEdit={setEdit} onCategoryEdited={onCategoryEdited}  />}
        {modal && <DeleteCategoryModal setModal={setModal} onDelete={() => onDelete(category._id)} />}
        <DropdownMenuTrigger className="flex items-center gap-2 text-sm font-medium outline-none">
          <BsThreeDotsVertical className="text-gray-500" />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="mt-2 mr-6">
          <DropdownMenuItem>
            <button onClick={() => {setEdit(true); onEdit(category)}} className="w-full flex items-center gap-2.5 text-xs">
              <span className="">
                <FiEdit />
              </span>
              Edit
            </button>
          </DropdownMenuItem>
          <DropdownMenuItem className="overflow-visible">
            <button onClick={() => setModal(true)} className="w-full flex items-center gap-2.5 text-xs">
              <span className="">
                <FiTrash2 />
              </span>
              Delete
            </button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  };
  
  export default CategoryActionDropdown;
  