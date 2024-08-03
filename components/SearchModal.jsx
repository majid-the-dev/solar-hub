"use client";

import { useState, useEffect } from "react";
import { IoSearchSharp } from "react-icons/io5";
import { MdClose } from "react-icons/md";

const SearchModal = () => {
  const [modal, setModal] = useState(false);

  return (
    <>
      <button
        onClick={() => setModal(true)}
        className="hover:bg-darkGreen/10 text-darkGreen text-lg rounded-full p-3"
      >
        <IoSearchSharp />
      </button>
      {modal && (
        <div className="fixed inset-0 bg-darkGreen flex items-center justify-center z-[999] px-6">
          <div onClick={(e) => e.stopPropagation()} className="w-full max-w-3xl rounded-lg animate__animated animate__zoomIn">
            <form className="w-full relative">
              <input
                type="text"
                placeholder="Search products here..."
                className="w-full bg-white/10 text-white text-lg font-medium rounded-full outline-none px-[50px] md:px-[60px] py-5 md:py-6 placeholder:text-white"
              />
              <IoSearchSharp className="absolute top-1/2 transform -translate-y-1/2 left-6 md:left-8 text-white text-xl" />
              <button onClick={() => setModal(false)} className="absolute -top-10 right-5 text-white text-xl">
                <MdClose />
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default SearchModal;
