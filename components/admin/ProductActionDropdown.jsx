"use client";

import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FiEdit } from "react-icons/fi";
import { FiTrash2 } from "react-icons/fi";
import EditProductModal from "./EditProductModal";
import DeleteProductModal from "./DeleteProductModal";

const ProductActionDropdown = ({
  product,
  onDelete,
  onEdit,
  onProductEdited,
}) => {
  const [modal, setModal] = useState(false);
  const [edit, setEdit] = useState(false);

  return (
    <DropdownMenu className="overflow-visible">
      {edit && (
        <EditProductModal
          product={product}
          setEdit={setEdit}
          onProductEdited={onProductEdited}
        />
      )}
      {modal && (
        <DeleteProductModal
          setModal={setModal}
          onDelete={() => onDelete(product._id)}
        />
      )}
      <DropdownMenuTrigger className="flex items-center justify-center text-sm font-medium outline-none">
        <BsThreeDotsVertical className="text-gray-500" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="mt-2 mr-6">
        <DropdownMenuItem>
          <button
            onClick={() => {
              setEdit(true);
              onEdit(product);
            }}
            className="w-full flex items-center gap-2.5 text-xs"
          >
            <span className="">
              <FiEdit />
            </span>
            Edit
          </button>
        </DropdownMenuItem>
        <DropdownMenuItem className="overflow-visible">
          <button
            onClick={() => setModal(true)}
            className="w-full flex items-center gap-2.5 text-xs"
          >
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

export default ProductActionDropdown;
