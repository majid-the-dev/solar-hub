import { useState } from "react";
import { FiTrash2 } from "react-icons/fi";

const DeleteCategoryModal = ({ setModal, onDelete }) => {

  const handleDelete = async () => {
    await onDelete();
    setModal(false);
  };

  return (
    <>
        <div onClick={() => setModal(false)} className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 px-6">
          <div onClick={(e) => e.stopPropagation()} className="bg-white w-full max-w-lg flex flex-col items-center justify-center rounded-lg p-7">
            <p className="bg-red-50 text-red-500 text-3xl rounded-full p-4">
                <FiTrash2 />
            </p>
            <h1 className="text-sm font-semibold mt-5">Delete Category</h1>
            <p className="w-full max-w-sm text-center text-gray-500 leading-5 mt-2">You are about to delete a product category. This action cannot be reversed.</p>
            <div className="flex items-center gap-3 mt-5">
                <button onClick={() => setModal(false)} className="text-gray-500 border border-gray-300 rounded-lg px-6 py-3">Cancel</button>
                <button onClick={handleDelete} className="bg-red-500 text-white rounded-lg px-6 py-3">Delete</button>
            </div>
          </div>
        </div>
      {/* )} */}
    </>
  );
};

export default DeleteCategoryModal;
